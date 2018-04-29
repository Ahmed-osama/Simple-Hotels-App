<template>
   <header class="main-header">
      <div class="main-header__container container">
        <router-link :to="{ path: '/' }" class="main-header__logo" >
        <img class="u-hide-sm" src="../../../static/img/logo.svg"/>
        <img class="u-hide-lg" src="../../../static/img/logo.svg"/>
        </router-link>
          <a class="main-header__menuToggler" id="sideMenuToggler"><span></span><span></span><span></span></a>
        <div class="main-header__sideMenu" id="headerSidemenu">
          <nav class="main-header__nav">
            <ul class="main-header__navList">
              <li><router-link :to="{ path: '/' }">Home</router-link></li>
              <li><router-link :to="{ path: 'results' }">Hotels</router-link></li>

            </ul>
          </nav>
        </div>
        <div class="main-header__menuCloser" id="menuCloser"></div>
        <div class="main-header__search" id="searchForm">
          <div class="main-header__searchForm">
            <input class="main-header__searchInput" @keyup.enter.prevent="setSearchKeyword" placeholder="search w/o dates"/>
            <svg class="u-icon  main-header__searchIcon ">
              <use xlink:href="../../../static/img/icons.svg#icon-search"></use>
            </svg>
          </div>
        </div><a class="main-header__searchButton" id="searchButton" href="#">
          <svg class="u-icon  main-header__searchButtonIcon ">
            <use xlink:href="../../../static/img/icons.svg#icon-search"></use>
          </svg>
          <svg class="u-icon  main-header__searchButtonIcon ">
            <use xlink:href="../../../static/img/icons.svg#icon-close"></use>
          </svg></a>
      </div>
    </header>
</template>

<script>
export default {
  name: 'app-header',
  data () {
    return {
      msg: 'Results'
    }
  },
  methods: {
    setSearchKeyword (e) {
      this.$router.push('results')
      this.$store.commit('setSearchKeyword', e.target.value)
      this.$store.commit('setUserDate', {
        value: '',
        dir: 'to'
      })
      this.$store.commit('setUserDate', {
        value: '',
        dir: 'from'
      })
    }
  }
}
</script>

<style scoped>

</style>
