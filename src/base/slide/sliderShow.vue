<template>
    <div class="slider">
        <div class="slider-group">
            <slot>
                
            </slot>
        </div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
 export default{
     props:{
         loop:{
             type: Boolean,
             default: true
         },
         autoPlay: {
             type: Boolean,
             default: true
         },
         interval: {
             type: Number,
             default: 4000
         }
     },
     methods:{
         _setSliderWidth(){
             this.children = this.$refs.sliderGroup.children;
         }
     },
     mounted(){
         setTimeout(()=>{
             
         },20)
     }
 }
</script>

<style scoped lang="scss">
@import '../../common/scss/variable';

</style>
