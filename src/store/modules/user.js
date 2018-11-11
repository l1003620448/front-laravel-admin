import {getInfo,getPermissions} from "@/api/admin";
import { register,login, logout ,refresh_token} from "@/api/login"
import { setToken, getToken, removeToken,getRefreshToken,setRefreshToken,removeRefreshToken } from '@/utils/auth'

const user = {
  state: {
    //token
    token:getToken(),
    //用户信息.
    info:{
      "name": "",
      "email": "",
      "avatr": null,
      "login_count": 0,
      "create_ip": null,
      "last_login_ip": null,
      "last_actived_at": null,
      "status": null,
      "role_id": null
    },
    role:{
      id: null,
      name:null,
      remark:null,
      status: null,
    },
    //权限列表.
    permissions: [],
  },

  mutations: {
    // 设置 token
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    //设置用户信息.
    SET_INFO: (state, info) => {
      state.info = info
    },
    //设置权限
    SET_PERMISSION:(state,permission)=>{
      state.permissions = permission
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          setToken(response.access_token,response.expires_in);
          setRefreshToken(response.refresh_token);
          commit('SET_TOKEN', response.access_token);
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit ,dispatch}) {
      return new Promise((resolve) => {
        getInfo().then(response => {
          commit('SET_INFO', response);
          resolve(response)
        }).catch(error => {
          //拦截401,去重新换取 token.
          if(error.response.status === 401){
            dispatch('refreshToken')
          }
        })
      })
    },

    //获取权限
    GetPermission({commit}){
      return new Promise((resolve,reject) => {
        getPermissions().then(response=>{
          commit('SET_PERMISSION', response.data);
          resolve(response)
        }).catch(error=>{
          reject(error)
        })
      })
    },


    // 登出
    Logout({ commit}) {
      return new Promise((resolve) => {
        logout().then(response => {
          commit('SET_TOKEN', '');
          removeToken();
          removeRefreshToken();
          resolve(response)
        }).catch(() => {
          resolve()
        })
      })
    },

    //换取 token
    refreshToken({commit,dispatch}){
      return new Promise((resolve)=>{
        let data = {};
        data.refresh_token = getRefreshToken();
        refresh_token(data).then(response=>{
          setToken(response.access_token,response.expires_in);
          setRefreshToken(response.refresh_token);
          commit('SET_TOKEN', response.access_token);
          location.reload();
          resolve(response)
        }).catch(error =>{
          if(error.response.status === 422){
            dispatch("Logout")
          }
        })
      })
    },

  }
};

export default user