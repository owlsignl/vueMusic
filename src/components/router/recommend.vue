<template>
    <div class="recommend">
        <my-slider :sliders="sliderList"></my-slider>
        <div class="recommend-list">
            <h2>热门歌单推荐</h2>
            <ul>
                <li v-for="item in musicList">
                    <div>
                        <img :src="item.imgurl" alt="">
                    </div>
                    <div>
                        <h2></h2>
                        <p></p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {getRecommend,getDiscList} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js'
import MySlider from '../../base/sliderShow'
export default {
  created () {
      this._getRecommend();
      this._getList();
  },
  data(){
      return {
          sliderList:[],
          musicList: []
      }
  },
  methods:{
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === ERR_OK) {
            this.sliderList = res.data.slider;
          }
        })
      },
      _getList(){
          getDiscList().then((res)=>{
              if(res.code === ERR_OK) {
                  console.log(res.data.list);
                  this.musicList = res.data.list;
              }
          })
      }
  },
  components: {
      MySlider
  }
}
</script>

<style lang="scss">
@import '../../common/scss/variable';
    .recommend{
        position: fixed;
        top: 88px;
        width: 100%;
    }
    .recommend-list{
        h2{
            height: 65px;
            line-height: 65px;
            text-align: center;
            font-size: $font-size-medium;
            color: $color-theme;
        }
    }
</style>

