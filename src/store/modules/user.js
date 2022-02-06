import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter,constantRoutes,allAsyncRoutes,anyRoutes} from '@/router'
import router from '@/router'
import cloneDeep from 'loadsh/cloneDeep'


function filterAllAsyncRoutes(allAsyncRoutes,routeNames){
  let asyncRoutes = allAsyncRoutes.filter(item=>{
    if(routeNames.indexOf(item.name) !== -1){
      if(item.children && item.children.length){
        item.children = filterAllAsyncRoutes(item.children,routeNames)
      }
      return true
    }
  })
  return asyncRoutes
}


const state = {
  token: localStorage.getItem('token_key'),
  name: '',
  avatar: '',
  routes:[]
}


const mutations = {
  RESET_STATE(state) {
    state.token = '',
    state.name = '',
    state.avatar = '',
    state.routes = []
  },
  /* 保存token */
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  /* 保存用户信息 */
  SET_USERINFO(state, userInfo) {
    state.name = userInfo.name
    state.avatar = userInfo.avatar
  },
  SET_ROUTES(state,asyncRoutes){
    state.routes = constantRoutes.concat(asyncRoutes,anyRoutes)
    router.addRoutes([...asyncRoutes,...anyRoutes])
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    try {
      const result = await login(userInfo)
      commit('SET_TOKEN', result.data.token)
      localStorage.setItem('token_key', result.data.token)
      return 'ok'
    } catch (error) {
      return Promise.reject('failed')
    }
  },
  //user getInfo
  async getInfo({ commit }) {
    try {
      const result = await getInfo(state.token)
      commit('SET_USERINFO', result.data)
      // console.log(result);
      commit('SET_ROUTES',filterAllAsyncRoutes(cloneDeep(allAsyncRoutes),result.data.routes))
      // console.log(111);
      return 'ok'
    } catch (error) {
      return Promise.reject('failed')
    }
  },

  //user logout
  async logout({ commit ,dispatch}) {
    try {
      const result = await logout()
      dispatch('resetToken')
      resetRouter()
      return 'ok'
    } catch (error) {
      return Promise.reject('failed')
    }
  },

  resetToken({commit}){
    localStorage.removeItem('token_key')
    commit('RESET_STATE')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

