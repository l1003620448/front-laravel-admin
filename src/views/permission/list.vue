<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="Add">新建</a-button>
    </div>
    <s-table
      size="default"
      :columns="columns"
      ref="table"
      :data="loadData">
      <div
        slot-scope="record"
        style="margin: 0">
      </div>
      <span slot="is_hidden" slot-scope="text">
        {{ text | isHiddenFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
      </span>
    </s-table>

    <a-modal
      title="操作"
      centered
      :width="800"
      v-model="visible"
      @ok="handleOk"
    >
      <a-form :autoFormCreate="(form)=>{this.form = form}">
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='名称'>
          <a-input placeholder='名称' v-model="mdl.name" id='name'/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='路由'>
          <a-input placeholder='路由' v-model="mdl.route" id='route'/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='图标'>
          <a-input placeholder='icon' v-model="mdl.icon" id='icon'/>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='顶级权限'
          hasFeedback>
          <a-tree-select
            style="width: 300px"
            allowClear
            dropdownMatchSelectWidth
            :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
            :treeData="treeData"
            placeholder='请选择'
            :treeDefaultExpandAll="false"
            v-model="mdl.parent_id"
          >
          </a-tree-select>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='隐藏'
          hasFeedback>
          <a-radio-group v-model="mdl.is_hidden">
            <a-radio :value="0">否</a-radio>
            <a-radio :value="1">是</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='排序'>
          <a-input-number v-model="mdl.sort"/>
        </a-form-item>
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import {getPermissions,getPermissionList,updatePermission} from '@/api/permission'

  export default {
    name: "list",
    components: {
      STable
    },

    data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        form: null,
        mdl: {},
        visible: false,
        treeData: [],

        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},

        // 表头
        columns: [
          {
            title: 'ID',
            dataIndex: 'id'
          },
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '路由',
            dataIndex: 'route',
          },
          {
            title: '上级权限',
            dataIndex: 'parent_name',
          },
          {
            title: '是否隐藏',
            dataIndex: 'is_hidden',
            scopedSlots: { customRender: 'is_hidden' },
          },
          {
            title: '排序',
            dataIndex: 'sort',
          },
          {
            title: '创建时间',
            dataIndex: 'created_at',
            sorter: true
          },
          {
            title: '更新时间',
            dataIndex :'updated_at',
            sorter: true,
          },
          {
            title: '操作',
            width: '150px',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          let parmas;
          parmas = Object.assign(parameter, this.queryParam);
          return getPermissions(parmas).then(response=>{
            return response;
          });
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    filters: {
      isHiddenFilter(value){
        const statusMap = {
          0: '显示',
          1: '隐藏'
        };
        return statusMap[value]
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        getPermissionList().then(response=>{
          //Todo 递归找上下级关系.
          this.treeData = this.getTrees(response.data,0);
        });
      },

      /**
       * 树状的算法
       * @params list     代转化数组
       * @params parentId 起始节点
       */
      getTrees(list, parentId) {
        let items= {};
        // 获取每个节点的直属子节点，*记住是直属，不是所有子节点
        for (let i = 0; i < list.length; i++) {
          let key = list[i].parent_id;
          if (items[key]) {
            items[key].push(list[i]);
          } else {
            items[key] = [];
            items[key].push(list[i]);
          }
        }

        return this.formatTree(items, parentId);
      },

      /**
       * 利用递归格式化每个节点
       */
      formatTree(items, parentId)
      {
        let result = [];
        if (!items[parentId]) {
          return result;
        }
        for (let t of items[parentId]) {
          t.children = this.formatTree(items, t.id);
          if(t.children.length >0){
            result.push({label: t.name, key: t.route, value: t.id.toString(),children:t.children});
          }else{
            result.push({label: t.name, key: t.route, value: t.id.toString()});
          }
        }
        return result;
      },

      Add () {
        this.$router.push({name: 'PermissionAdd'})
      },
      handleEdit (record) {
        this.mdl = record;
        this.mdl.parent_id = record.parent_id.toString();
        this.visible = true
      },
      handleOk () {
        let _this = this;
        let data = null;
        data = this.mdl;
        updatePermission(this.mdl.id,data).then(response=>{
          this.$notification.success({
            message: '提示',
            description: '更新成功',
            duration:1,
            onClose:function () {
              _this.$refs.table.refresh();
              _this.visible = false;
            },
          });
        })
      },
    },
  }
</script>

<style scoped>

</style>