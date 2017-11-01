<template>
    <div class="music-list">
        <div class="back" @click="back">
            <i class="icon-back"></i>
        </div>
        <h1 v-html="title"></h1>
        <div class="bg-img" :style="style" ref="bgimg">
            <div class="player">
                <div class="play">
                    <i class="icon-play"></i>
                    <span class="text">随机播放全部</span>
                </div>
            </div>
            <div class="filter"></div>
        </div>
        <scroll ref="scroll" :data="song" class="list" :probeType="probeType"
        :listen-scroll="listenScroll">
            <div class="song-list-w">
                <song-list :songs="song"></song-list>
            </div>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
    export default {
        props: {
            song: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            },
            bgimg: {
                type: String,
                default: ''
            }
        },
        components:{
            Scroll,
            SongList
        },
        data(){
            return {
                listenScroll: true,
                probeType: 3
            }
        },
        computed:{
            style(){
                return `background-image:url(${this.bgimg})`
            }
        },
        mounted(){
            this.$refs.scroll.$el.style.top = this.$refs.bgimg.clientHeight + 'px';
        },
        methods:{
            back(){
                this.$router.push('/singer');
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';
@import '~common/scss/mixin';
    .music-list{
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        left: 0;
        right: 0;
        background-color: $color-background;  
        .back{
            position: absolute;
            top: 0;
            left: 6px;
            z-index: 50;
            .icon-back{
                display: block;
                padding: 10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }
        h1{
            position: absolute;
            top: 0;
            left: 10%;
            z-index: 40;
            width: 80%;
            line-height: 40px;
            @include nowrap();
            text-align: center;
            color: $color-text;
            font-size: $font-size-large;
        }
        .bg-img{
            position: relative;
            width: 100%;
            height: 0;
            padding-top: 70%;
            transform-origin: top;
            background-size: cover;
            .player{
                position: absolute;
                bottom: 20px;
                width: 100%;
                z-index: 50;
                .play{
                    box-sizing: border-box;
                    width: 135px;
                    padding: 7px 0;
                    border: 1px solid $color-theme;
                    border-radius: 100px;
                    margin: 0 auto;
                    text-align: center;
                    color: $color-theme;
                    font-size: 0;
                    .icon-play{
                        display: inline-block;
                        vertical-align: middle;
                         margin-right: 6px;
                        font-size: $font-size-medium-x
                    }
                    .text{
                        display: inline-block;
                        vertical-align: middle;
                        font-size: $font-size-small;
                    }
                }
            }
            .filter{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(7, 17, 27, 0.4);
            }
        }
        .list{
            position: fixed;
            top: 0;
            bottom: 0;
            overflow:hidden;
            width: 100%;
            background: $color-background;
            .song-list-w{
                padding: 20px 30px;
            }
        }
    }
</style>
