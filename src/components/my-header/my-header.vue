<template>
  <div class="my-header">
      <div class="icon"></div>
      <h1>Chicken Music</h1>
      <router-link tag="div" to="/user" class="user">
        <i class="icon-mine"></i>
      </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import '../../common/scss/variable.scss';
    .icon{
        display: inline-block;
        margin-top: 6px;
        width: 30px;
        height: 32px;
        background: url('./logo@2x.png') no-repeat;
        background-size: 100%;
    }
    .my-header{
        position: relative;
        text-align: center;
        height: 44px;
        color: $color-theme;
        h1{
            display: inline-block;
            vertical-align: top;
            font-size:$font-size-large;
            line-height:44px;
        }
        .user{
            position: absolute;
            top:0;
            right: 0;
            padding: 12px;
            font-size: 20px;
        }
    }
</style>


