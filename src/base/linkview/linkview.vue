<template>
    <scroll ref="scroll" class="list-view" :listenScroll="listenScroll" @scroll="scroll">
        <ul>
            <li class="list-group" v-for="group in data">
                <h3 ref="title">{{group.title}}</h3>
                <ul>
                    <li v-for="item in group.items" class="list-group-item">
                        <img :src="item.avatar" alt="">
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="list-quick" @touchstart.stop.prevent="onTouchStart">
          <li ref="short" v-for="(item,index) in QuickList" :class="{active:index == current}" :data-index="index">{{item}}</li>      
        </ul>
    </scroll>
    
</template>

<script>
import Scroll from '../scroll/scroll'
import {getAttr} from '../../common/js/dom'
    export default{
        props:{
            data:{
                type: Array,
                default: []
            }
        },
        data(){
           return {
               current:0,
               listenScroll: true
           }
        },
        created(){
            
        },
        components:{
            Scroll,
        },
        computed:{
            QuickList(){
                return this.data.map((item)=>{
                    return item.title.substr(0,1);
                })
            },
        },
        methods:{
          onTouchStart(e){
              let anchorIndex = getAttr(e.target,"index");
          },
          scroll(pos){
              console.log(pos.y);
          }
        },
        mounted(){  
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
        .list-quick{
                    position: absolute;
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                    padding: 20px 0;
                    border-radius: 10px;
                    width: 20px;
                    text-align: center;
                    color: $color-text-l;
                    background-color: $color-background-d;
                }
                li{
                    padding: 1px;
                    line-height: 1;
                    font-size: $font-size-medium;
                    &.active{
                        color: $color-theme;
                    }
                }
    }
</style>
