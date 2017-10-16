<template>
  <ul class="tab">
      <router-link tag="li" class="item-tab" to="/recommend">
        <span>推荐</span>
      </router-link>
      <router-link tag="li" class="item-tab" to="/singer">
        <span>歌手</span>
      </router-link>
      <router-link tag="li" class="item-tab" to="/rank">
        <span>排行</span>
      </router-link>
      <router-link tag="li" class="item-tab" to="/search">
        <span>搜索</span>
      </router-link>
  </ul>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
@import '../../common/scss/variable.scss';
.tab{
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  color: $color-text-l;
  .item-tab{
    flex: 1;
    text-align: center;
    span{
      padding-bottom: 5px;
    }
    &.router-link-active{
      span{
        color: $color-theme;
        border-bottom: 2px solid $color-theme;
      }
      
    }
  }
}
</style>


