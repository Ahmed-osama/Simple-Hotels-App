<template>
  <section class="background">
    <div class="container container--main container--center">
      <section class="section section--fullPadding date-zone container--center">
          <div class="row">
            <div class="col-xs-12">
              <h4 class="white_color">i want to book :</h4>
            </div>
            <div class="col-md-4">
              <datepicker  :format="formatDate" v-model="from_date" placeholder="start date"></datepicker>
            </div>
            <div class="col-md-1 u-flex-center date-zone__to">
              to
            </div>
            <div class="col-md-4">
              <datepicker :format="formatDate"  v-model="to_date" placeholder="End Date"></datepicker>
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
    formatDate(date) {
      date = new Date(date)
      let dd = date.getDate()
      let mm = date.getMonth() + 1
      let yyyy = date.getFullYear()
      dd = dd < 10 ? '0' + dd : dd
      mm = mm < 10 ? '0' + mm : mm
      return dd + '-' + mm + '-' + yyyy
    },
    toDate(date) {
      let parts = date.split("-");
      return new Date(parts[2], parts[1] - 1, parts[0]);
    },
    getResults (){
      this.$router.push('results')
    },
    isDateInRange (userRange, AvilableRange){
      let userFrom = this.toDate(userRange.from)
      let userTo = this.toDate(userRange.to)

      let avilableFrom = this.toDate(AvilableRange.from)
      let avilableTo = this.toDate(AvilableRange.to)
      return (userFrom>=avilableFrom && userTo<= avilableTo)
    }
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
