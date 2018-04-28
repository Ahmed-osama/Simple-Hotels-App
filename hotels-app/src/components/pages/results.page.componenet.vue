<template>
    <div class="container container--main ">
      <div class="row">
        <div class="col-md-3">
          <div class="listCard">
             <div class="listCard__item">
               <strong>Filters</strong>
             </div>
            <div class="listCard__item">
              <div class="input-container">
                <div class="input-container__tip">
                  <svg class="u-icon ">
                    <use xlink:href="../../../static/img/icons.svg#icon-search"></use>
                  </svg>
                </div>
                <input type="text" @input="setSearchKeyword" placeholder="Enter hotel name">
              </div>
            </div>
            <div class="listCard__item">
              <label>Price range :</label>
              <vue-slider
                :value ="Math.round(priceSpan.min*daysLength)"
                :min="Math.round(priceSpan.min*daysLength)"
                :max="Math.round(priceSpan.max*daysLength)"
                @callback="setMinPrice"
              />
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="heading   ">
            <h4 class="heading__title">total nights : {{daysLength}} </h4>
            <div class="heading__more">
              <select v-model="nameSort" @change="changeNameSort">
                <option value="" disabled selected> sort by name</option>
                <option value="assending">assending</option>
                <option value="descending">descending</option>
              </select>
              <select v-model="priceSort" @change="changePriceSort">
                <option value="" disabled selected> sort by price</option>
                <option value="lowest">lowest price</option>
                <option value="highest">highest price</option>
              </select>
            </div>
          </div>
          <transition-group class="row" name="fade">
            <div class="col-md-4" v-for='(hotel, index) in hotels' :key="index">
              <card :hotel = "hotel" />
            </div>
            <div v-if="loading" class="col-xs-12  loading-div loading-div--row loading-div--centered loading-div--page" key="loading"></div>
            <div class="col-xs-12"  v-if="!loading && hotels.length == 0" key="msg">
              <div class="msg msg--note">
                sorry we cant find hotels
                <p v-if="searchKeyword != ''">includes keyword "<span class="red_color">{{searchKeyword}}</span>"</p>
                <p v-if="priceSpan.userSelection != null">and price equal or grater than "<span class="red_color">{{priceSpan.userSelection}}</span>"</p>
                <p v-if="userDate">betweeen <span class="red_color">{{userDate.from}}</span> and <span class="red_color">{{userDate.to}}</span></p>
                <router-link :to="{ path: '/' }" class="btn btn--sm red_bg">reset dates</router-link>
              </div>
            </div>
          </transition-group>
         
        </div>
      </div>
    </div>
</template>

<script>
import card from '../shared/card.componenet'
// https://github.com/NightCatSama/vue-slider-component
import vueSlider from 'vue-slider-component'

export default {
  name: 'results',
  data () {
    return {
      nameSort: '',
      priceSort: ''
    }
  },
  components: {
    'card': card,
    'vue-slider': vueSlider
  },
  computed: {
    daysLength: function () {
      return this.$store.getters.daysLength
    },
    hotels: function () {
      return this.$store.getters.filteredHotels
    },
    loading: function () {
      return this.$store.state.loading
    },
    priceSpan: function () {
      return this.$store.state.priceSpan
    },
    searchKeyword () {
      return this.$store.state.searchKeyword
    },
    userDate () {
      return this.$store.state.userDate
    }
  },
  methods: {
    setMinPrice (e) {
      console.log(e)
      this.$store.commit('setMinPrice', e)
    },
    setSearchKeyword (e) {
      this.$store.commit('setSearchKeyword', e.target.value)
    },
    setSortType (value) {
      this.$store.commit('setSortType', value)
    },
    changePriceSort: function () {
      this.nameSort = ''
      this.setSortType(this.priceSort)
    },
    changeNameSort: function () {
      this.priceSort = ''
      this.setSortType(this.nameSort)
    }
  },
  watch: {
    hotels: function () {
      if (this.hotels.length > 0) {
        this.loading = false
      }
    }
  },
  mounted () {
    this.$store.commit('setHotels')
    if (this.hotels.length > 0) {
      this.loading = false
    }
  }
}
</script>

<style>
 .listCard{
    background: white;
    border-radius: 3px;
    box-shadow: 0px 2px 6px -1.1px rgba(0,0,0,0.11);
    margin-bottom: 30px;
  }
  .listCard__item{
    padding:20px;
  }
  .listCard__item + .listCard__item{
    border-top:1px solid #f2f2f2;
  }
  .slide-fade-enter, .slide-fade-leave-to{
    opacity: 0;
  }
  .slide-fade-enter-active{
      opacity: 0.5;
      transform:translateY(30px);
  }
  .slide-fade-leave-active {
    position: absolute;
    opacity: 0;
    transform:translateY(-100%) scale(0);
  }
  .expand-fade-enter-active {
    transition: all .1s ease;
  }
  .expand-fade-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .expand-fade-enter, .expand-fade-leave-to{
    transform: translateY(-20px) scale(0.9);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-to
  /* .component-fade-leave-active for <2.1.8 */ {
    opacity: 0;
  }
  .list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
  select{
    max-width:150px;
  }
  select + select{
    margin-left: 10px;
  }
</style>
