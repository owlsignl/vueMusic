<template>
    <div class="singer">
        <list-view @select="select" :data="singerList"></list-view>
        <router-view></router-view>
    </div>
</template>

<script>
import {getSingerList} from '../../api/recommend'
import listView from '../../base/linkview/linkview'
    export default {
        components:{
            listView,
        },
        data(){
            return {
                singerList: [],
            }
        },
        computed:{
            hotSinger(){
                return this.singerList.slice(0,10);
            }
        },
        mounted(){
            this._getSingerList();
        },
        methods:{
            select(singer){
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
            },
            _getSingerList(){
                getSingerList().then((res)=>{
                   this.singerList = this.normalLise(res.data.list);
                },(err)=>{
                    console.log(err);
                })
            },
            normalLise(list){
                let hot_name = '热门';
                let hot_len = 10;
                let hot = [];
                let ret = [];
                let map = {
                    hot: {
                        title: hot_name,
                        items: []
                    }
                };
                list.forEach((item,index)=>{
                    if(index < hot_len){
                        map.hot.items.push({
                            id: item.Fsinger_mid,
                            name: item.Fsinger_name,
                            avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                        })
                    }
                    const key = item.Findex;
                    if(!map[key]){
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    map[key].items.push({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name,
                        avatar: `https://y.gtimg.cn/music/photo_new/T001R150x150M000${item.Fsinger_mid}.jpg?max_age=2592000`
                    })
                });
                    hot.push(map.hot);
                    for(var k in map){
                        let val = map[k];
                        if(val.title.match(/[a-zA-Z]/)){
                            ret.push(val);
                        }
                    }
                     ret=ret.sort((val1,val2)=>{
                         return val1.title.charCodeAt() - val2.title.charCodeAt();
                     })
                return hot.concat(ret);
            }
        }
    }
</script>

<style lang="scss">
   .singer{
       position: absolute;
       top: 88px;
       bottom: 0;
       width: 100%;
   }
</styles>

