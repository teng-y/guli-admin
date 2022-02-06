import reqEchartsData from "@/api/echarts"
const state = {
  echartsData:{}
}

const mutations = {
  SET_ECHARTSDATA(state,echartsData){
    state.echartsData = echartsData
  }
}

const actions = {
  async getEchartsData({commit}){
    const result = await reqEchartsData()
    if(result.code === 2100){
      commit('SET_ECHARTSDATA',result.data)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
