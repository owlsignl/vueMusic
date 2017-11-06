import * as types from './mutation-types'
import {mode} from 'common/js/config'
import {shuffle} from 'common/js/util'

export const selectPlay = function({commit,state},{list,index}) {
    commit(types.SET_SEQUENCELIST,list)
    if(state.mode === mode.random) {
        let randomlist = shuffle(list);
        index = findindex(randomlist,list[index]);
        commit(types.SET_PLAYLIST,randomlist);
    }else{
        commit(types.SET_PLAYLIST,list)
    }
    commit(types.SET_CURRENTINDEX,index)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)
}

export const randomPlay = function({commit},{list}) {
    commit(types.SET_MODE,mode.random)
    commit(types.SET_SEQUENCELIST)
    commit(types.SET_FULLSCREEN,true)
    commit(types.SET_PLAYING,true)
    let randomlist = shuffle(list);
    commit(types.SET_PLAYLIST,randomlist)
    commit(types.SET_CURRENTINDEX,0)
}

function findindex (list,song) {
    return list.findIndex((item,index)=>{
        return item.id === song.id;
    })
}