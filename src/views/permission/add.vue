<template>
  <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='名称'
        fieldDecoratorId="data.name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '名称不能为空' }]}">
        <a-input placeholder='起一个名字' v-model="data.name" id='name' />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='路由'
        fieldDecoratorId="data.route">
        <a-input placeholder='起一个名字' v-model="data.route" id='route' />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='顶级权限'
        hasFeedback>
        <a-select v-model="data.parent_id" allowClear showSearch :filterOption="filterOption">
          <a-select-option :key="permission.id" v-for="(permission, index) in permissions">{{permission.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='状态'
        hasFeedback>
        <a-select v-model="data.status" >
          <a-select-option :value="1">正常</a-select-option>
          <a-select-option :value="0">禁止</a-select-option>
        </a-select>
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
        data(){
          return {
            form: null,
            permissions:{},

            data:{
              name:"",
              parent_id:null,
              status:1,
              role_id:null,
            },

            description: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',

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
        created(){
          this.init();
        },
        methods:{
          init(){
            getPermissionList().then(response=>{
              this.permissions = response.data;
            })
          },
          filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
          },
          handleSubmit(e){
            e.preventDefault();
          },
        }
    }
</script>

<style scoped>

</style>