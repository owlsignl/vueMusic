<template>
  <transition name="det">
      <div class="detail">
      
      </div>
  </transition>
</template>

<script>
    export default{

    }
</script>

<style lang="scss">
    .det-enter-active,.det-leave-active{
        transition: all .5s;
    }
    .det-enter,.det-leave-to{
        transform: translateX(100%);
    }
</style>
