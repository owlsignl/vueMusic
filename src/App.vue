<template>
  <div id="app">
    <my-header></my-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import myHeader from './components/my-header/my-header'
import tab from './components/tab/tab'
import Player from 'components/router/player/player'
export default {
  components: {
    tab,
    myHeader,
    Player
  },
}
</script>

<style lang="scss" rel="stylesheet/scss">
@import "./common/scss/variable.scss";
@import "./common/scss/reset.scss";
@import "./common/scss/icon.scss";
</style>