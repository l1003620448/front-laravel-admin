<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="Add">新建</a-button>
    </div>
    <s-table
      size="default"
      ref="table"
      :columns="columns"
      :data="loadData">
      <div
        slot-scope="record"
        style="margin: 0">
      </div>
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
          label='名称'
        >
          <a-input placeholder='起一个名字' v-model="mdl.name" id='name' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='描述'
          hasFeedback
        >
          <a-textarea :rows="5" v-model="mdl.remark" placeholder="..." id='describe'/>
        </a-form-item>
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import {getRoleList,updateRole} from '@/api/role'

  export default {
    name: "list",
    components: {
      STable
    },

    data () {
      return {
        visible: false,

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

        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},

        // 表头
        columns: [
          {
            title: 'Id',
            dataIndex: 'id'
          },
          {
            title: '名称',
            dataIndex: 'name',
          },
          {
            title: '描述',
            dataIndex: 'remark',
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
          return getRoleList(parmas).then(response=>{
            return response;
          });
        },

        selectedRowKeys: [],
        selectedRows: []
      }
    },
    methods: {
      Add () {
        this.$router.push({name: 'RoleAdd'})
      },
      handleEdit (record) {
        this.mdl = record;
        this.visible = true
      },
      handleOk () {
        let _this = this;
        let data = null;
        data = this.mdl;
        updateRole(this.mdl.id,data).then(response=>{
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