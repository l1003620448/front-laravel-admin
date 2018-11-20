<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='名称'
        fieldDecoratorId="data.name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '名称不能为空' }]}">
        <a-input placeholder='名称' v-model="data.name" id='name'/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='路由'>
        <a-input placeholder='路由' v-model="data.route" id='route'/>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='图标'>
        <a-input placeholder='icon' v-model="data.icon" id='icon'/>
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
          v-model="data.parent_id"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='隐藏'
        hasFeedback>
        <a-radio-group v-model="data.is_hidden">
          <a-radio :value="0">否</a-radio>
          <a-radio :value="1">是</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='排序'>
        <a-input-number v-model="data.sort"/>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
  import {getPermissionList,addPermission} from "@/api/permission"

  export default {
    name: "add",
    data() {
      return {
        form: null,

        data: {
          name: "",
          route: "",
          icon: "",
          parent_id: null,
          is_hidden: 0,
          sort:255,
        },

        treeData: [],

        labelCol: {
          lg: {span: 7},
          sm: {span: 7},
        },

        wrapperCol: {
          lg: {span: 10},
          sm: {span: 17}
        },

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
      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      handleSubmit(e) {
        e.preventDefault();

        this.form.validateFields((err, values) => {
          if (err) {
            return
          }

          let data = {};
          data = this.data;
          let _this = this;
          addPermission(data).then(response=>{
            this.$notification.success({
              message: '提示',
              description: '新增权限成功',
              duration:2,
              onClose:function () {
                _this.$router.push({name: 'PermissionList'})
              }
            });
          });
        })

      },
    }
  }
</script>

<style scoped>

</style>