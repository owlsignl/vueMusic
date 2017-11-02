<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="normal">
            <div class="normal-player" v-show="fullScreen">
                <div class="background"></div>
                <div class="top">
                    <div class="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1>歌名</h1>
                    <h2>歌手</h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-warper">
                            <div class="cd">
                                <img src="" alt="">
                            </div>
                        </div>
                        <div class="playing-lyric-warper">
                            <div class="playing-lyric"></div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="dot-warper">
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    <div class="process">
                    </div>
                    <div class="operator">
                        <div class="icon mode">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon previous">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon playing-status">
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon next">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon collect">
                            <i class="icon-not-favorite"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player">
                <div class="icon">
                    <img src="" alt="">
                </div>
                <div class="context">
                    <h3 class="title">歌名</h3>
                    <h3 class="name">歌手</h3>
                </div>
                <div class="control">
                    <i class="icon-play-mini"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        computed:{
            ...mapGetters([
                'currentSong',
                'fullScreen',
                'playlist'
            ])
        },
    }
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
    .player{
       .normal-player{
           position: fixed;
           top: 0;
           bottom: 0;
           width: 100%;
           z-index: 150;
           background-color: $color-background;
           .background{
               position: absolute;
               top: 0;
               left: 0;
               width:100%;
               height: 100%;
               z-index: -1;
               opacity: 0.6;
               filter: blur(20px);
           }
           .top{
               position: relative;
               margin-bottom: 25px;
               .back{
                   position: absolute;
                   left: 6px;
                   z-index: 50;
                   .icon-back{
                       display: block;
                       padding: 9px;
                       font-size:$font-size-large-x;
                       color:$color-theme;
                       transform: rotate(-90deg);
                   }
               }
               h1{
                   margin: 0 auto;
                   width: 70%;
                   height: 40px;
                   line-height: 40px;
                   text-align: center;
                   
                   color: $color-text;
                   font-size: $font-size-large;
               }
               h2{
                   text-align: center;
                   line-height: 20px;
                   color:$color-text;
                   font-size:$font-size-medium;
                   @include nowrap();
               }
           }
           .middle{
               position: fixed;
               top: 80px;
               bottom: 170px;
               width: 100%;
               white-space: nowrap;
               font-size: 0;
               .middle-l{
                   display: inline-block;
                   position: relative;
                   padding-top: 80%;
                   vertical-align: top;
                   width: 100%;
                   height: 0;
                   .cd-warper{
                       position: absolute;
                       left: 10%;
                       top: 0;
                       width: 80%;
                       height: 100%;
                       .cd{
                           width: 100%;
                           height: 100%;
                           box-sizing: border-box;
                           border: 10px solid rgba(255, 255, 255, 0.1);
                           border-radius: 50%;
                           img{
                               width: 100%;
                               height: 100%;
                               border-radius: 50%;
                           }
                       }
                   }
               }
           }
           .bottom{
               position: absolute;
               bottom: 50px;
               width: 100%;
               .dot-warper{
                   text-align: center;
                   font-size: 0;
                   .dot{
                       display: inline-block;
                       margin: 0 4px;
                       vertical-align: middle;
                       border-radius:50%;
                       width:8px;
                       height:8px;
                       background-color:$color-text-l;
                       &.active{
                           border-radius: 5px;
                           width: 20px;
                           background-color: $color-text-ll;
                       }
                   }
               }
               .operator{
                   display: flex;
                   align-items: center;
                   .icon{
                       flex: 1;
                       color: $color-theme;
                       font-size: 30px;
                   }
                   .mode,.previous{
                       text-align: right;
                   }
                   .playing-status{
                       padding: 0 20px;
                       text-align: center;
                       font-size: 40px;
                   }
               }
           }
       }
       .mini-player{
           position: fixed;
           bottom:0;
           display: flex;
           align-items: center;
           z-index: 150;
           width: 100%;
           height: 60px;
           background-color: $color-highlight-background;
           .icon{
               flex: 0 0 40px;
               padding: 0 10px 0 20px;
               width: 40px;
               img{
                   border-radius: 50%;
               }
           }
           .context{
               display: flex;
               flex-direction: column;
               justify-content:center;
               flex: 1;
               line-height: 20px;
               overflow: hidden;
               .title{
                   margin-bottom: 2px;
                   @include nowrap();
                   font-size: $font-size-medium;
                   color: $color-text;
               }
               .name{
                   @include nowrap();
                   font-size: $font-size-small;
                   color: $color-text-d;
               }
           }
           .control{
               flex: 0 0 30px;
               padding: 0 10px;
               i[class |= 'icon']{
                   font-size: 30px;
                   color: $color-theme-d;
               }
               .icon-play-mini{
                   font-size: 32px;
               }
           }
       }
    }
</style>
