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
      style="top: 20px;"
      :width="800"
    >

    </a-modal>

  </a-card>
</template>

<script>
  import STable from '@/components/table/'
  import {getRoleList} from '@/api/role'

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
          return getRoleList(parmas).then(response=>{
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
    methods: {
      Add () {
        this.$router.push({name: 'AdminAdd'})
      },
      onChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows
      },
      toggleAdvanced () {
        this.advanced = !this.advanced
      },
    },
  }
</script>

<style scoped>

</style>