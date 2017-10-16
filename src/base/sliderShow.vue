<template>
  <div class="slide-show">
      <div class="slide-img">
            <a :href="sliders[nowIndex].linkUrl">
                <transition name="slide-trans">
                    <img v-if="isShow" :src="sliders[nowIndex].picUrl" alt="">
                </transition>
                <transition name="slide-trans-old">
                    <img class="old" v-if="!isShow" :src="sliders[nowIndex].picUrl" alt="">
                </transition>
            </a>
      </div>
      <div class="slide-list">
          <span v-for="(item,index) in sliders" :class="{dot: index === nowIndex}"></span>
      </div>
  </div>
</template>

<script>
    export default{
        props:{
            sliders:{
                type: Array
            }
        },
        data(){
            return {
                nowIndex: 0,
                isShow: true
            }
        },
        computed: {
            nextIndex: function(){
                if(this.nowIndex === this.sliders.length -1) {
                    return 0;
                }else{
                    return this.nowIndex + 1;
                }
            },
            prevIndex: function(){
                if(this.nowIndex === 0) {
                    return this.sliders.length -1;
                }else{
                    return this.nowIndex - 1;
                }
            }
        },
        methods: {
            go: function(index){
                this.isShow = false;
                setTimeout(()=> {
                    this.isShow = true;
                    this.nowIndex = index;
                }, 1);
            },
            next: function(){
                this.go(this.nextIndex);
            },
            prev: function() {
                this.go(this.prevIndex);
            },
            runInv: function() {
                var timer = setInterval(()=>{
                    this.next();
                },2000)
            }
        },
        mounted:function(){
            this.runInv();
        }
    }
</script>

<style scoped lang="scss">
@import '../common/scss/variable';
  .slide-trans-enter-active{
      transition: all 1.5s;
  }
  .slide-trans-enter{
      transform: translateX(100%);
  }
  .slide-trans-old-leave-active{
      transition: all 1.5s;
  }
  .slide-trans-old-leave-to{
      transform: translateX(-100%);
  }
  .slide-show{
      position: relative;
      width: 100%;
      .slide-img{
          width: 100%;
          overflow: hidden;
          img{
              vertical-align: top;
                width: 100%;
                &.old{
                      position: absolute;
                      top: 0;
                      left: 0;
                }
            }
        }
        .slide-list{
            position: absolute;
            bottom: 12px;
            text-align: center;
            width: 100%;
            span{
                display: inline-block;
                margin-right: 10px;
                border-radius: 50%;
                width: 8px;
                height: 8px;
                background-color: $color-text-l;
                &.dot{
                    border-radius: 4px;
                    width: 20px;
                    background-color: $color-text-ll;
                }
            }
        }
          
    }


</style>
