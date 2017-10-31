<template>
    <scroll ref="scroll" 
        class="list-view" 
        :listenScroll="listenScroll"
        :data="data" 
        @scroll="scroll"
        :probeType="probeType">
        <ul>
            <li ref="listGroup" class="list-group" v-for="group in data">
                <h3 ref="title">{{group.title}}</h3>
                <ul>
                    <li v-for="item in group.items" class="list-group-item" @click="select(item)">
                        <img :src="item.avatar" alt="">
                        <p>{{item.name}}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <ul class="list-quick" @touchstart.stop.prevent="onTouchStart" @touchmove.stop.prevent="onTouchMove">
          <li ref="short" v-for="(item,index) in QuickList" :class="{active:index == current}" :data-index="index">{{item}}</li>      
        </ul>
        <div class="fixed" v-show="fixedTitle" ref="fixedTop">
            <p class="fixed-title">{{fixedTitle}}</p>
        </div>
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
               scrollY: -1,
               diff: -1
           }
        },
        created(){
            this.listenScroll = true;
            this.listHeight = [];
            this.probeType = 3;
            this.touch = {}
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
            fixedTitle(){
                if(this.scrollY > 0){
                    return ''
                }
                return this.data[this.current] ? this.data[this.current].title : '';
            }
        },
        methods:{
            select(item){
                this.$emit("select",item)
            },
          onTouchStart(e){
              let anchorIndex = getAttr(e.target,"index");
              let firstTouch = e.touches[0];
              this.touch.y1 = firstTouch.pageY;
              this.touch.newindex = anchorIndex;
              this._scrollTo(anchorIndex);
          },
          onTouchMove(e){
              let diffY = e.touches[0].pageY - this.touch.y1;
              let delta = diffY/18 | 0;
              let anchorIndex = parseInt(this.touch.newindex) + delta;
              this._scrollTo(anchorIndex); 
          },
          scroll(pos){
              this.scrollY = pos.y;
          },
          _scrollTo(index){
              if(!index && index !== 0){
                  return 
              }
              if(index < 0){
                  index = 0;
              }else if(index > this.listHeight.length - 2){
                  index = this.listHeight.length - 2;
              }else{
                  this.current = index;
              }
              this.scrollY = - this.listHeight[index];
              this.$refs.scroll.scrollToElement(this.$refs.listGroup[index],0); 
          },
          getHeight(){
              let height = 0;
              this.listHeight = [];
              let listGroup = this.$refs.listGroup;
              const listHeight = this.listHeight;
              listHeight.push(height);
              for(let i=0;i < listGroup.length;i++){
                  height += listGroup[i].clientHeight;
                  listHeight.push(height);
              }
          },
        },
        watch:{
            data(){
                setTimeout(()=>{
                    this.getHeight();
                },20)
            },
            scrollY(newY){
              if(newY > 0){
                  this.current = 0;
                  return 
              }
              for(let i=0;i<this.listHeight.length - 1;i++){
                  let heightMix = this.listHeight[i];
                  let heightMax = this.listHeight[i+1];
                  if(-newY > heightMix && -newY < heightMax){
                      this.current = i;
                      this.diff = heightMax + newY;
                      return 
                  }
              }
              if(-newY > this.listHeight[this.listHeight -1]){
                  this.current = this.listHeight -1;
                  return 
              }
          },
          diff(newV){
              let fixedTop = (newV > 0 && newV < 30) ? newV-30 : 0;
              if(this.fixedTop === fixedTop){
                  return 
              }
              this.fixedTop = fixedTop;
              this.$refs.fixedTop.style.transform = `translateY(${fixedTop}px)`;
          }
        },
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
                li{
                    padding: 1px;
                    line-height: 1;
                    font-size: $font-size-medium;
                    &.active{
                        color: $color-theme;
                    }
                }
        }
        .fixed{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            .fixed-title{
                padding-left: 20px;
                height: 30px;
                line-height: 30px;
                font-size: $font-size-small;
                color: $color-text-l;
                background: $color-highlight-background;
            }
        }
    }
</style>
