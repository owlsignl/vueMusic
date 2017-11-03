<template>
    <div class="player" v-show="playlist.length > 0">
        <transition name="normal"
            @enter="enter"
            @leave="leave">
            <div class="normal-player" v-show="fullScreen">
                <div class="background"></div>
                <div class="top">
                    <div class="back" @click="back">
                        <i class="icon-back"></i>
                    </div>
                    <h1 v-html="currentSong.name"></h1>
                    <h2 v-html="currentSong.singer"></h2>
                </div>
                <div class="middle">
                    <div class="middle-l">
                        <div class="cd-warper" ref="cd">
                            <div :class="playSta" class="cd">
                                <img :src="currentSong.image" alt="">
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
                            <i @click="togglePlay" :class="playIcon"></i>
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
            <div @click="open" class="mini-player" v-show="!fullScreen">
                <div :class="playSta" class="icon">
                    <img width="40px" height="40px" :src="currentSong.image" alt="">
                </div>
                <div class="context">
                    <h3 class="title" v-html="currentSong.name"></h3>
                    <h3 class="name" v-html="currentSong.singer"></h3>
                </div>
                <div class="control">
                    <i @click.stop.prevent="togglePlay" :class="miniIcon"></i>
                </div>
                <div class="control">
                    <i class="icon-playlist"></i>
                </div>
            </div>
        </transition>
        <audio :src="currentSong.url" ref="audio"></audio>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import Velocity from 'velocity-animate'
    export default {
        computed:{
            ...mapGetters([
                'currentSong',
                'fullScreen',
                'playlist',
                'playing'
            ]),
            playIcon(){
               return this.playing ? 'icon-pause' : 'icon-play'; 
            },
            miniIcon(){
                return this.playing ? 'icon-pause-mini' : 'icon-play-mini';
            },
            playSta(){
                return this.playing ? 'play':'play pause';
            }
        },
        methods:{
             getDesc(item){
                return `${item.singer}·${item.album}`
            },
            back(){
                this.setFullScreen(false);
            },
            open(){
                this.setFullScreen(true);
            },
            ...mapMutations({
                setFullScreen: 'SET_FULLSCREEN',
                setPlaying: 'SET_PLAYING'
            }),
            enter(el,done){
                 let {x,y,scale} = this.getAnimate();
                 Velocity(this.$refs.cd,{
                     translateX: `-${x}px`,
                     translateY:`${y}px`,
                     scale: `${scale}`
                 },1)
                 Velocity(this.$refs.cd,{
                     scale: 1.1,
                     translateX: 0,
                     translateY: 0,
                 },{duration: 400})
                 Velocity(this.$refs.cd,{
                     scale: 1
                 },done)
            },
            leave(el,done){
                let {x,y,scale} = this.getAnimate();
                 Velocity(this.$refs.cd,{
                     translateX: `-${x}px`,
                     translateY:`${y}px`,
                     scale: `${scale}`
                 },400,done)
            },
            togglePlay(){
                this.setPlaying(!this.playing);
            },
            getAnimate(){
                let paddingTop = 80;
                let paddingBottom = 30;
                let paddingLeft = 40;
                let miniW = 40;
                let width = window.innerWidth * 0.8;
                let scale = miniW / width;
                let x = window.innerWidth / 2 - paddingLeft;
                let y = window.innerHeight - paddingTop - width/2 - paddingBottom;
                return {
                    x,
                    y,
                    scale
                }
            }
        },
        watch:{
            currentSong(newSong){
                this.$nextTick(()=>{
                    this.$refs.audio.play();
                })
            },
            playing(newState){
                let audio = this.$refs.audio;
                this.$nextTick(()=>{
                    newState ? audio.play():audio.pause();
                })
            }
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
                   @include nowrap();
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
                           &.play{
                               animation: rotate 20s linear infinite;
                           }
                           &.pause{
                               animation-play-state: paused;
                           }
                           img{
                               position: absolute;
                               left: 0px;
                               top: 0px;
                               height: 100%;
                               width: 100%;
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
           &.normal-enter-active,&.normal-leave-active{
               transition: all 0.4s;
               .top,.bottom{
                   transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
               }
           }
           &.normal-enter, &.normal-leave-to{
               opacity: 0;
               .top{
                   transform: translate3d(0, -100px, 0);
               }
               .bottom{
                   transform: translate3d(0, 100px, 0)
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
               &.play{
                    animation: rotate 20s linear infinite;
                    }
               &.pause{
                    animation-play-state: paused;
                    }
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
           &.mini-enter-active, &.mini-leave-active{
               transition: all 0.4s;
           }
           &.mini-enter, &.mini-leave-to{
               opacity: 0;
           }
        
       }
    }
    @keyframes rotate{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
</style>
