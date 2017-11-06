import {mode} from 'common/js/config'
const state = {
    singer:{},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: mode.sequence,
    currentIndex: -1
}
export default state