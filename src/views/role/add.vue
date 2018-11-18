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
        label='描述'
        hasFeedback
      >
        <a-textarea :rows="5" v-model="data.remark" placeholder="..." id='describe'/>
      </a-form-item>
      <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
        <a-button htmlType="submit" type="primary">提交</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
    import {addRole} from "@/api/role";
    export default {
        name: "add",
        data(){
          return {
            form: null,

            data:{
              name:"",
              remark:"",
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
        },
        methods:{
          handleSubmit(e){
            e.preventDefault();
            this.form.validateFields((err, values) => {
              if (err) {
                return;
              }

              let data = {};
              data = this.data;
              let _this = this;
              addRole(data).then(response=>{
                this.$notification.success({
                  message: '提示',
                  description: '新增角色成功',
                  duration:2,
                  onClose:function () {
                    _this.$router.push({name: 'RoleList'})
                  }
                });
              });
            })

          }
        }
    }
</script>

<style scoped>

</style>