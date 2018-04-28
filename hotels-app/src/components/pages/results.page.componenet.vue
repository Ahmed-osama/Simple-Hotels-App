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
                <input type="text" placeholder="Enter hotel name">
              </div>
            </div>
            <div class="listCard__item">
              <label>Price range :</label>
              <vue-slider />
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <div class="heading  heading--borderbottom">
            <h4 class="heading__title">8 results between dates : </h4>
            <div class="heading__more">
              <select name="" id=""></select>
              <select name="" id=""></select>
            </div>
          </div>
          <div class="row">
            <div class="col-md-4" v-for='hotel in hotels' :key="hotel">
               <card :hotel = "hotel" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import card from '../shared/card.componenet'
import vueSlider from 'vue-slider-component'
import axios from 'axios'
export default {
  name: 'results',
  data () {
    return {
      msg: 'Results',
      hotels: []
    }
  },
  components: {
    'card': card,
    'vue-slider': vueSlider
  },
  mounted () {
    axios.get(`https://api.myjson.com/bins/tl0bp`).then((result) => {
      console.log(result)
      this.hotels.push(...result.data.hotels)
    })
  }
}
</script>

<style scoped>
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
</style>
