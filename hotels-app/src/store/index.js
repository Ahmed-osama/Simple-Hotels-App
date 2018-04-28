import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../modules/utility'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userDate: {
      from: '',
      to: ''
    },
    hotels: [],
    priceSpan: {
      min: 0,
      max: 0,
      userSelection: null
    },
    searchKeyword: '',
    sortType: ''
  },
  mutations: {
    setUserDate (state, payload) {
      state.userDate[payload.dir] = payload.value
    },
    setHotels: function (state, payload) {
      if (state.hotels.length === 0) {
        axios.get(`https://api.myjson.com/bins/tl0bp`)
          .then((result) => {
            state.hotels.push(...result.data.hotels)
            this.commit('setPrice')
          })
      }
    },
    setPrice (state) {
      let prices = []
      state.hotels.forEach(item => {
        prices.push(item.price)
      })
      state.priceSpan.min = Math.min(...prices)
      state.priceSpan.max = Math.max(...prices)
    },
    setMinPrice (state, payload) {
      state.priceSpan.userSelection = payload
    },
    setSearchKeyword (state, payload) {
      state.searchKeyword = payload
    },
    setSortType (state, payload) {
      state.sortType = payload
    }
  },
  getters: {
    daysLength: (state) => {
      if (state.userDate.from === '' && state.userDate.to === '') return 1
      let length = utils.getDaysLengthBetween(state.userDate.from, state.userDate.to)
      return length
    },
    filteredHotels: (state, getters) => {
      return state.hotels.filter(item => {
        return (item.price >= (state.priceSpan.userSelection / getters.daysLength) && (item.name.toLowerCase().includes(state.searchKeyword.toLowerCase()) || item.city.toLowerCase().includes(state.searchKeyword.toLowerCase())))
      }).sort(utils.sortby[state.sortType])
    }
  }
})
