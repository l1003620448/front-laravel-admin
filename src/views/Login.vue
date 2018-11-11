<template>
    <div class="main">
      <a-form class="user-layout-login" ref="data" :autoFormCreate="(form)=>{this.form = form}" id="formLogin">
        <a-form-item
          fieldDecoratorId="username"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入帐户名或邮箱地址' }], validateTrigger: 'blur'}">
          <a-input size="large" type="text" v-model="data.username" placeholder="请输入帐户名或邮箱地址">
            <a-icon slot="prefix" type='user' :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item
          fieldDecoratorId="password"
          :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}">
          <a-input size="large" type="password" v-model="data.password" placeholder="请输入密码">
            <a-icon slot="prefix" type='lock' :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item style="margin-top:24px">
          <a-button
            size="large"
            type="primary"
            htmlType="submit"
            class="login-button"
            :loading="loginBtn"
            @click.stop.prevent="handleSubmit"
            :disabled="loginBtn">确定
          </a-button>
        </a-form-item>
      </a-form>
    </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import { mapActions } from "vuex"

  export default {
    components: {AFormItem},
    data () {
      return {
        data: {
          username: "",
          password: "",
          rememberMe:true,
        },
        loginBtn: false,
        form: null,
      }
    },
    methods: {
      ...mapActions([ "Login" ]),
      handleSubmit () {
        this.form.validateFields([ 'username', 'password' ], { force: true }, (err) => {
          if (!err) {
            this.Login(this.data).then(()=>{
              this.loginBtn = false;
              this.$router.push({ name: "dashboard" });
              this.$message.success('欢迎回来', 3)
            });
          }
        })
      },

    }
  }
</script>

<style lang="scss" scoped>

  .user-layout-login {
    label {
      font-size: 14px;
    }
    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }
    .forge-password {
      font-size: 14px;
    }
    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }
    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;
      .item-icon {
        font-size: 24px;
        color: rgba(0,0,0,.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color .3s;
        &:hover {
          color: #1890ff;
        }
      }
      .register {
        float: right;
      }
    }
  }
</style>