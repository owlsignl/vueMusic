<template>
    <div class="music-list">
        <div class="top">
            <div class="back" @click="back">
                <i class="icon-back"></i>
            </div>
            <h2>{{title}}</h2>
            <div class="bgimg">
                <img :src="bgimg">
            </div>
        </div>
    </div>
</template>

<script>
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
        created(){
        }
    }
</script>

<style lang="scss" scoped>
@import '~common/scss/variable';
    .music-list{
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        background-color: $color-background;
    }
    .top{
        .back{
            margin-left: 6px;
            .icon-back{
                display: block;
                padding: 10px;
                font-size: $font-size-large-x;
                color: $color-theme;
            }
        }
        h2{
            position: absolute;
            top: 0;
            left: 10%;
            width: 80%;
            line-height: 40px;
            text-align: center;
            color: $color-theme;
            font-size: $font-size-large;
        }
        .bgimg{
            width: 100%;
            img{
                width: 100%;
                
            }
        }
    }
</style>
