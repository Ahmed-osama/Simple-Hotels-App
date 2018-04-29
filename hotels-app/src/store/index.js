import Vue from 'vue'
import Vuex from 'vuex'
import utils from '../modules/utility'
import axios from 'axios'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: true,
    userDate: {
      from: '10-10-2020',
      to: '20-12-2020'
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
            this.commit('setLoading', false)
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
    },
    setLoading (state, payload) {
      state.loading = payload
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
        let priceFilter = item.price >= (state.priceSpan.userSelection / getters.daysLength)
        let searchFilter = item.name.toLowerCase().includes(state.searchKeyword.toLowerCase()) || item.city.toLowerCase().includes(state.searchKeyword.toLowerCase())
        let hasDateInRange = false
        if (state.userDate.to !== '' && state.userDate.from !== '') {
          item.availability.forEach(date => {
            date.inrange = utils.isDateInRange(state.userDate, date)
            if (date.inrange) hasDateInRange = true
          })
        } else {
          hasDateInRange = true
        }
        return priceFilter && searchFilter && hasDateInRange
      }).sort(utils.sortby[state.sortType])
    }
  }
})
