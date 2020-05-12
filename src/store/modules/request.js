const state = {
  cancelTokenList: []
}

const mutations = {
  PUSH_REQUEST: (state, { cancelToken }) => {
    state.cancelTokenList.push(cancelToken)
  },
  CLEAR_REQUEST: (state) => {
    state.cancelTokenList.forEach(item => {
      item('路由跳转取消请求')
    })
    setTimeout(() => {
      state.cancelTokenList = []
    }, 10)
  }
}

const actions = {
  pushRequest({ commit }, data) {
    commit('PUSH_REQUEST', data)
  },
  clearRequest({ commit }) {
    commit('CLEAR_REQUEST')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
