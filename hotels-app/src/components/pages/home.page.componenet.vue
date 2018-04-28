<template>
  <section class="background">
    <div class="container container--main container--center">
      <section class="section section--fullPadding date-zone container--center">
          <div class="row">
            <div class="col-xs-12">
              <h4 class="white_color">i want to book :</h4>
            </div>
            <div class="col-md-4">
              <div class="input-container">
                <div class="input-container__tip">
                  <svg class="u-icon">
                    <use xlink:href="../../../static/img/icons.svg#icon-calendar"></use>
                  </svg>
                </div>
                <datepicker :open-date="openDate" :disabledDates="deisabledDatesFrom"  @selected="setFrom" placeholder="start date"></datepicker>
              </div>
            </div>
            <div class="col-md-1 u-flex-center date-zone__to">
              to
            </div>
            <div class="col-md-4">
              <div class="input-container">
                <div class="input-container__tip">
                  <svg class="u-icon">
                    <use xlink:href="../../../static/img/icons.svg#icon-calendar"></use>
                  </svg>
                </div>
                <datepicker :open-date="openDate"   @selected="setTo" placeholder="End Date"></datepicker>
              </div>
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
      deisabledDatesFrom: {
        to: this.openDate
      }
    }
  },
  computed: {
    openDate: function() {
      return new Date(this.toDate('10-10-2020'))
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
.input-container__tip {
  right: 5px;
}
.input-container__tip .u-icon{
  height: 1.4em;
  width: 1.5em;
  opacity: 0.3;
}
</style>
