<template>
  <div class="post-view post-view--card post-view--cardBounded " v-if="hotel">
    <!-- <router-link  class="post-view__link" :to="{ path: '/hotel',  params: { id: 123 } }"></router-link> -->
    <div class="post-view__caption" alt="Guide to London for Seniors">
      <a class="post-view__padge red_bg btn" href="#">{{hotel.city}}</a>
      <h4 class="post-view__maxTitle">{{hotel.name}}</h4>
      <h6 class="post-view__item">
         <strong class="post-view__price"> {{ totalcost }}$ </strong>
         <span> per nights</span>
      </h6>
      <div class="post-view__avilability">
          <div class="post-view__avilabilityRow"
            v-for="(date,index) of hotel.availability"
            :key="index"
            :class="{
              'post-view__avilabilityItem--avilable':date.inrange,
              'post-view__avilabilityItem--not':!date.inrange,
            }"
          >
            <div class="post-view__avilabilityItem">{{date.from}}</div>
            <div class="post-view__avilabilityItem">{{date.to}}</div>

          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'app-header',
  props: {
    hotel: {
      type: Object
    }
  },
  computed: {
    totalcost: function (params) {
      return Math.round(this.hotel.price * this.$store.getters.daysLength)
    }
  },
  data () {
    return {
      msg: ''
    }
  }
}
/* eslint-disable */
</script>

<style scoped>
  .post-view__padge{
    margin-bottom: 20px;
    position: static;
  }
  .post-view--cardBounded{
    height: auto;
  }
  .post-view__caption{
    padding-top:20px;
    box-shadow: 0px 2px 6px -1.1px rgba(0,0,0,0.11);
    height: 346px;
  }
  .post-view__item{
    margin:0 -20px;
    padding:15px 20px;
    border-top: 1px solid #f2f2f2;
    display: flex;
    flex-direction: column;
  }
  .post-view__maxTitle{
    min-height: initial;
    height: auto;
    margin-bottom: 15px;
  }
  .post-view__avilability{
    border-top: 1px solid #f2f2f2;
    margin: 0 -20px;
  }
  .post-view__avilabilityRow {
    display: flex;
  }
  .post-view__avilabilityRow + .post-view__avilabilityRow{
    border-top: 1px solid #f2f2f2;
  }
  .post-view__avilabilityItem{
    flex-basis: 50%;
     align-items: center;
    justify-content: center;
    font-size: 12px;
    color:#bcbcbc;
    padding:10px 20px;
    text-align: center;
    
  }
  .post-view__avilabilityItem--avilable {
    background: #e2f5e3;
  }
  .post-view__avilabilityItem--not {
    background: #fbe1dd;
  }
  .post-view__avilabilityItem + .post-view__avilabilityItem{
    border-left: 1px solid #f2f2f2;
  }
  .post-view__price{
    margin-bottom: 10px;
  }
</style>