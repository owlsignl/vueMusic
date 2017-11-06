export function shuffle(arr) {
    let _arr = arr.slice();
    for (let i = 0; i < _arr.length; i++) {
        let j = random(i,0);
        let ret = _arr[i];
        _arr[i] = _arr[j];
        _arr[j] = ret;
    }
    return _arr;
}

function random(max,min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}