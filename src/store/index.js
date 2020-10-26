import Vue from 'vue'
import Vuex from 'vuex'
import material from './material'
import product from './product'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    material,
    product
  }
})
