import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    userAcc: '',
    nickName: '',
    imgSrc: '',
    userId: 0
  },
  getters: {
    userAcc: state => state.userAcc,
    nickName: state => state.nickName,
    imgSrc: state => state.imgSrc,
  },
  mutations: {
    setUserAcc (state, payload) {
        state.userAcc = payload
    },
    setNickName (state, payload) {
        state.nickName = payload
    },
    setImgSrc (state, payload) {
        state.imgSrc = payload
    }
  }
})

export default store