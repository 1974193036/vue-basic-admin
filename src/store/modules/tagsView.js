const state = {
  visitedViews: [],
  cachedViews: []
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    // console.log(state.visitedViews, view)
    // if (state.visitedViews.some(v => v.meta.title === view.meta.title)) return
    // if (state.visitedViews.some(v => view.path.includes(v.path))) return
    if (state.visitedViews.some(v => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    for (const v of state.cachedViews) {
      if (v === view.name) {
        const index = state.cachedViews.indexOf(v)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => v.meta.affix || v.path === view.path)
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = []
  }
}

const actions = {
  addView({ dispatch }, view) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view)
  },
  updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
  delView({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },
  delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view) {
    // return new Promise(resolve => {
    //   commit('DEL_OTHERS_VISITED_VIEWS', view)
    //   resolve([...state.visitedViews])
    // })
    commit('DEL_OTHERS_VISITED_VIEWS', view)
  },
  delOthersCachedViews({ commit, state }, view) {
    // return new Promise(resolve => {
    //   commit('DEL_OTHERS_CACHED_VIEWS', view)
    //   resolve([...state.cachedViews])
    // })
    commit('DEL_OTHERS_CACHED_VIEWS', view)
  },
  delAllViews({ dispatch, state }) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews')
      dispatch('delAllCachedViews')
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    // return new Promise(resolve => {
    //   commit('DEL_ALL_VISITED_VIEWS')
    //   resolve([...state.visitedViews])
    // })
    commit('DEL_ALL_VISITED_VIEWS')
  },
  delAllCachedViews({ commit, state }) {
    // return new Promise(resolve => {
    //   commit('DEL_ALL_CACHED_VIEWS')
    //   resolve([...state.cachedViews])
    // })
    commit('DEL_ALL_CACHED_VIEWS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
