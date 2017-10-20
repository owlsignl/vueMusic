<template>
    <div class="recommend">
        <scroll :data="songList" class="recommend-content">
          <div>
            <div v-if="recommends.length" class="slider-wrapper">
              <my-slider :length="recommends">
                  <div v-for="item in recommends">
                    <a :href="item.linkUrl">
                      <img :src="item.picUrl" alt="">
                    </a>
                  </div>
                </my-slider>
            </div>
            <div class="recommend-list">
              <h2>热门歌单推荐</h2>
              <ul v-if="songList.length">
                  <li v-for="item in songList" class="item">
                    <div class="icon">
                      <img :src="item.imgurl" width="60" height="60">
                    </div>
                    <div class="text">
                      <h3>{{item.creator.name}}</h3>
                      <p>{{item.dissname}}</p>
                      <p>{{item.listennum}}</p>
                    </div>
                  </li>
                </ul>
            </div>
          </div>
        </scroll>
    </div>
</template>

<script>
import {getRecommend,getDiscList} from '../../api/recommend.js'
import {ERR_OK} from '../../api/config.js'
import MySlider from '../../base/slide/sliderShow'
import Scroll from '../../base/scroll/scroll'
export default {
  components:{
    MySlider,
    Scroll
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
              this.songList = res.data.list;
              console.log(this.songList);
          }
      })
    },
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
        .recommend-list{
          h2{
            text-align: center;
            height: 65px;
            line-height: 65px;
            font-size: font-size-medium;
            color: $color-theme;
          }
          .item{
            display: flex;
            box-sizing: border-box;
            align-items: center;
            padding: 0 20px 20px 20px;
          }
          .icon{
            flex:0 0 60px;
            padding-right: 20px;
            width: 60px;
          }
          .text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            overflow: hidden;
            font-size: $font-size-medium;
            line-height: 20px;
            h3{
              margin-bottom: 10px;
              color: $color-text;
            }
            p{
              color: $color-text-d;
            }
          }
        }
      }
    }
</style>

