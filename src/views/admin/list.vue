<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="Add">新建</a-button>
    </div>
    <s-table
      size="default"
      :columns="columns"
      :data="loadData">
      <div
        slot-scope="record"
        style="margin: 0">
      </div>
      <span slot="status" slot-scope="text">
        {{ text | statusFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">详情</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
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
          label='密码'>
          <a-input type='password' placeholder='请输入密码' v-model="mdl.password" id='password' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='Emeil'>
          <a-input placeholder='请输入email' v-model="mdl.email" id='email' />
        </a-form-item>
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='所属角色'
          hasFeedback>
          <a-select v-model="mdl.role_id" style="width:300px"  allowClear showSearch :filterOption="filterOption">
            <a-select-option :key="role.id" v-for="(role, index) in roles">{{role.name}}</a-select-option>
          </a-select>
        </a-form-item>
        <a-input type="hidden" placeholder='唯一识别码' v-model="mdl.id" disabled="disabled" />
        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label='状态'
        >
          <a-select v-model="mdl.status">
            <a-select-option :value='1'>正常</a-select-option>
            <a-select-option :value='0'>禁用</a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import {getAdminList,updateAdmin} from '@/api/admin'
  import {getRoles} from '@/api/role';

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
          roles:{},
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
              title: '邮箱',
              dataIndex: 'email',
            },
            {
              title: '头像',
              dataIndex: 'avatr',
            },
            {
              title: '登录次数',
              dataIndex: 'login_count',
            },
            {
              title: '注册IP',
              dataIndex: 'create_ip',
            },
            {
              title: '最后活跃IP',
              dataIndex: 'last_login_ip',
            },
            {
              title: '状态',
              dataIndex: 'status',
              scopedSlots: { customRender: 'status' },
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
            return getAdminList(parmas).then(response=>{
              return response;
            });
          },

          selectedRowKeys: [],
          selectedRows: []
        }
      },
      filters: {
        statusFilter(status) {
          const statusMap = {
            1: '正常',
            2: '禁用'
          };
          return statusMap[status]
        }
      },
      created(){
        this.init();
      },
      methods: {
        init(){
          this.getRoleList();
        },
        getRoleList(){
          getRoles().then(response=>{
            this.roles = response.data;
          });
        },
        Add () {
          this.$router.push({name: 'AdminAdd'})
        },
        handleEdit (record) {
          this.mdl = Object.assign({}, record);
          this.visible = true
        },
        filterOption(input, option) {
          return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        },
        handleOk () {
          let _this = this;
          let data = null;
          data = this.mdl;
          updateAdmin(this.mdl.id,data).then(response=>{
            this.$notification.success({
              message: '提示',
              description: '更新成功',
              duration:2,
              onClose:function () {
                _this.visible = false;
              }
            });
          })
        },
      },
    }
</script>

<style scoped>

</style>