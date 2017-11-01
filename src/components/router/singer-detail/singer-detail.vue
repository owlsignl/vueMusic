<template>
  <transition name="det">
      <music :song="songList" :title="title" :bgimg="bgimg"></music>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSong} from 'api/recommend.js'
import {createSong} from 'common/js/song.js'
import {ERR_OK} from 'api/config.js'
import Music from '../music/music'
    export default{
        computed: {
            title(){
                return this.singer.name;
            },
            bgimg(){
                return this.singer.avatar; 
            },
            ...mapGetters([
                'singer'
            ])
        },
        components:{
            Music
        },
        data(){
            return {
                songList: []
            }
        },
        created(){
                this._getSongList();
        },
        methods:{
            _getSongList(){
                getSong(this.singer.id).then((res)=>{
                    if(res.code === ERR_OK){
                        this.songList = this.normalize(res.data.list);
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            normalize(list){
                let ret = [];
                list.forEach((item)=>{
                    let musicData = item.musicData;
                    ret.push(createSong(musicData));
                })
                return ret;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .det-enter-active,.det-leave-active{
        transition: all .5s;
    }
    .det-enter,.det-leave-to{
        transform: translateX(100%);
    }
</style>
