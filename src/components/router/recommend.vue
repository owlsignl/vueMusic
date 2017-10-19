<template>
    <div class="recommend">
        <div class="recommend-content">
          <div v-if="recommends.length" class="slider-wrapper">
            <my-slider :length="recommends">
              <div v-for="item in recommends">
                <a :href="item.linkUrl">
                  <img :src="item.picUrl" alt="">
                </a>
              </div>
            </my-slider>
          </div>
        </div>
    </div>
</template>

<script>
import {getRecommend,getDiscList} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js'
import MySlider from '../../base/slide/sliderShow'
export default {
  components:{
    MySlider
  },
  data(){
      return {
          recommends: [],
          songList:[]
      }
  },
  created(){
    this._getRecommend();
    this._getSongList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then((res) => {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider;
        }
      })
    },
    _getSongList(){
      getDiscList().then((res)=>{
          if(res.code == ERR_OK) {
              console.log(res.data);
          }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../common/scss/variable';
    .recommend{
      position: fixed;
      top: 88px;
      bottom: 0;
      width: 100%;
      .recommend-content{
        height: 100%;
        overflow: hidden;
        .slider-wrapper{
          position: relative;
          width: 100%;
          overflow: hidden;
        }
      }
    }
</style>

