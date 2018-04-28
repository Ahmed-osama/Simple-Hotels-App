<template>
  <section class="background">
    <div class="container container--main container--center">
      <section class="section section--fullPadding date-zone container--center">
          <div class="row">
            <div class="col-xs-12">
              <h4 class="white_color">i want to book :</h4>
            </div>
            <div class="col-md-4">
              <datepicker   @selected="setFrom" placeholder="start date"></datepicker>
            </div>
            <div class="col-md-1 u-flex-center date-zone__to">
              to
            </div>
            <div class="col-md-4">
              <datepicker   @selected="setTo" placeholder="End Date"></datepicker>
            </div>
            <div class="col-md-3">
              <a class="btn btn--block yellow_bg" @click.prevent="getResults()">
                 <svg class="u-icon">
                    <use xlink:href="../../../static/img/icons.svg#icon-search"></use>
                  </svg>
              </a>
            </div>
            </div>
      </section>
    </div>
  </section>
</template>

<script>
// https://github.com/charliekassel/vuejs-datepicker
import Datepicker from 'vuejs-datepicker'
import util from '../../modules/utility'
/* eslint-disable */
export default {
  name: 'home',
  components: {
    Datepicker
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      from_date: '',
      to_date: '',
      formate_date: ''
    }
  },
  methods: {
    setdate (dir, value){
      value = this.formatDate(value)
      this.$store.commit('setUserDate',{ 
        value : value,
        dir:dir
      })
    },
    setFrom (e){
      this.setdate('from', e)
    },
    setTo(e){
      this.setdate('to', e)
    },
    formatDate: util.formatDate,
    toDate: util.toDate,
    // isDateInRange: util.isDateInRange,
    getResults (){
      this.$router.push('results')
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
datepicker {
  color: #bcbcbc;
}
.date-zone {
  background: #e64129;
  border-radius: 3px;
  box-shadow: 0 3px 35px rgba(0, 0, 0, 0.25);
}
.date-zone__to {
  color: #fff;
}
.background {
  background-image: url(../../../static/img/flightsballoons.jpg);
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
</style>
