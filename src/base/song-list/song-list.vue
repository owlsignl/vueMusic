<template>
  <div class="song-list">
      <ul>
          <li v-for="(item,index) in songs" class="item" @click="select(item,index)">
              <div class="content">
                  <p class="name">{{item.name}}</p>
                  <p class="desc" v-html="getDesc(item)"></p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
    export default {
        props: {
            songs: {
                type: Array,
                default: []
            },
        },
        methods:{
            select(item,index){
                this.$emit('select',item,index)
            },
            getDesc(item){
                return `${item.singer}·${item.album}`
            }
        }
    }
</script>

<style scoped lang="scss">
@import '~common/scss/variable';
@import '~common/scss/mixin';
    .song-list{
        .item{
            display: flex;
            align-items: center;
            box-sizing: border-box;
            height: 64px;
            font-size: $font-size-medium;
            .content{
                flex: 1;
                line-height: 20px;
                overflow: hidden;
                .name{
                    color:$color-text;
                }
                .desc{
                    margin-top: 4px;
                    @include nowrap();
                    color:$color-text-d;
                }
            }
        }
    }
</style>


