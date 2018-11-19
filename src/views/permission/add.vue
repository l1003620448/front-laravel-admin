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
        <a-select v-model="data.parent_id" allowClear showSearch :filterOption="filterOption">
          <a-select-option :key="permission.id" v-for="(permission, index) in permissions">{{permission.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-divider />
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='顶级权限'
        hasFeedback>
        <a-tree
          checkable
          @expand="onExpand"
          :expandedKeys="tree.expandedKeys"
          v-model="tree.checkedKeys"
          :autoExpandParent="tree.autoExpandParent"
          :selectedKeys="tree.selectedKeys"
          @select="onSelect"
          :treeNodes="tree.Permissionlist" :checkStrictly="true" :multiple="true">
        </a-tree>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='隐藏'
        hasFeedback>
        <a-select v-model="data.is_hidden">
          <a-select-option :value="0">否</a-select-option>
          <a-select-option :value="1">是</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='状态'
        hasFeedback>
        <a-select v-model="data.status">
          <a-select-option :value="1">正常</a-select-option>
          <a-select-option :value="0">禁止</a-select-option>
        </a-select>
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
  import {getPermissionList} from "@/api/permission"

  export default {
    name: "add",
    data() {
      return {
        form: null,
        permissions: {},

        data: {
          name: "",
          route: "",
          icon: "",
          parent_id: null,
          is_hidden: 0,
          sort:255,
          status: 1,
        },

        tree:{
          Permissionlist:[],
          expandedKeys: [],
          checkedKeys: [],
          selectedKeys:[],
          autoExpandParent: true,
        },

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
        this.tree.checkedKeys = [];
        getPermissionList().then(response=>{
          //Todo 递归找上下级关系.
          this.$set(this.tree,'Permissionlist',this.getTrees(response.data,0));
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
            result.push({title: t.name, key: t.route,children:t.children});
          }else{
            result.push({title: t.name, key: t.route});
          }
        }
        return result;
      },

      onExpand (expandedKeys) {
        this.tree.expandedKeys = expandedKeys;
        this.tree.autoExpandParent = false
      },
      onCheck (checkedKeys) {
        console.log('onCheck', checkedKeys);
        this.tree.checkedKeys = checkedKeys
      },
      onSelect (selectedKeys, info) {
        console.log('onSelect', info)
        this.tree.selectedKeys = selectedKeys
      },

      filterOption(input, option) {
        return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      },
      handleSubmit(e) {
        e.preventDefault();
      },
    }
  }
</script>

<style scoped>

</style>