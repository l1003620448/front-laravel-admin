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
        label='密码'
        fieldDecoratorId="data.password"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能我为空' }]}">
        <a-input type='password' placeholder='请输入密码' v-model="data.password" id='password' />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='确认密码'
        fieldDecoratorId="data.password_confirmation"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '密码不能为空' },{validator: handleConfirmBlur}]}">
        <a-input type='password' placeholder='请确认密码' v-model="data.password_confirmation" id='password_confirmation' />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='Emeil'
        fieldDecoratorId="data.email"
        :fieldDecoratorOptions="{rules: [{ required: true, message: 'email不能为空' },{type:'email',message:'邮箱格式不正确'}]}">
        <a-input placeholder='请输入email' v-model="data.email" id='email' />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='所属角色'
        hasFeedback>
        <a-select v-model="data.role_id" style="width:300px"  allowClear showSearch :filterOption="filterOption">
          <a-select-option :key="role.id" v-for="(role, index) in roles">{{role.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label='状态'
        hasFeedback>
        <a-select v-model="data.status" defaultValue="1" style="width: 120px">
          <a-select-option value="1">正常</a-select-option>
          <a-select-option value="-1">禁用</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
    import {getRoles,} from '@/api/role';
    import {addAdmin} from '@/api/admin';

    export default {
        name: "add",
        data(){
          return {
            // form
            form: null,
            roles:{},

            data:{
              name:"",
              password:"",
              password_confirmation:"",
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

            data:{
              name:null,
              status:null,
              remark:null,
              permission_ids:[],
            },
          }
        },
        created(){
          this.init();
        },
        methods:{
          init(){
            this.getRoleList();
          },
          getRoleList(){
            getRoles().then(response=>{
              this.roles = response.data;
            });
          },
          handleConfirmBlur  (rule, value, callback) {
            if (value !== this.data.password) {
              callback('两次输入密码不一致')
            }
            callback()
          },
          filterOption(input, option) {
            return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
          },
          handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
              if (err) {
                this.$notification['error']({
                  message: '填写有误噢,请仔细检查',
                  description: values
                })
              }

              let data = {};
              data = this.data;
              let _this = this;
              addAdmin(data).then(response=>{
                this.$notification.success({
                  message: '提示',
                  description: '新增管理员成功',
                  duration:2,
                  onClose:function () {
                    _this.$router.push({name: 'AdminList'})
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