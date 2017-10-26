<template>
    <scroll class="list-view">
        <ul>
            <li class="list-group" v-for="group in data">
                <h3>{{group.title}}</h3>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img :src="item.avatar" alt="">
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        
    </scroll>
    
</template>

<script>
import Scroll from '../scroll/scroll'
    export default{
        props:{
            data:{
                type: Array,
                default: []
            }
        },
        components:{
            Scroll,
        }
    }
</script>

<style lang="scss">
@import '../../common/scss/variable';
    .list-view{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: $color-background;
        .list-group{
            padding-bottom: 30px;
            h3{
                padding-left: 20px;
                height: 30px;
                line-height: 30px;
                font-size: $font-size-small;
                color: $color-text-l;
                background-color: $color-highlight-background;
            }
            .list-group-item{
                display: flex;
                align-items: center;
                padding: 20px 0 0 30px;
                img{
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                }
                p{
                    margin-left: 20px;
                    font-size: $font-size-medium;
                    color: $color-text-l;
                }
            }
        }
    }
</style>
