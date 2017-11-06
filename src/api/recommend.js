import jsonp from '../common/js/jsonp.js'
import {commonParams,options} from './config.js'
import axios from 'axios'
//获取banner数据
export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
      })

    return jsonp(url,data,options);
}
//获取歌单列表
export function getDiscList() {
    const url = '/api/getDiscList'
  
    const data = Object.assign({}, commonParams, {
      platform: 'yqq',
      hostUin: 0,
      sin: 0,
      ein: 29,
      sortId: 5,
      needNewCode: 0,
      categoryId: 10000000,
      rnd: Math.random(),
      format: 'json'
    })
  
    return axios.get(url, {
      params: data
    }).then((res) => {
      return Promise.resolve(res.data)
    })
  }
//获取歌手列表
  export function getSingerList(){
    const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg';
    const data = Object.assign({}, commonParams, {
      channel:"singer",
      page: "list",
      key: "all_all_all",
      pagesize: 100,
      pagenum: 1,
      platform: 'yqq',
      loginUin: 0,
      hostUin: 0,
      needNewCode: 0
      
    });
    return jsonp(url,data,options);
  }
  //获取歌曲列表
  export function getSong(mid){
    const url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
    const data = Object.assign({},commonParams,{
      loginUin: 0,
      hostUin: 0,
      platform: "yqq",
      needNewCode: 0,
      singermid: mid,
      order: "listen",
      begin: 0,
      num: 100,
      songstatus: 1
    });
    return jsonp(url,data,options);
  }
  //获取歌词
  export function getLyric(mid) {
    const url = '/api/getLyric';
    const data = {
      songmid: mid,
      loginUin: 0,
      hostUin: 0,
      platform: "yqq",
      needNewCode: 0,
      notice: 0
    }
  }