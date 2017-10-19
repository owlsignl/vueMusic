export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }else{
    let newClass = el.className.split(' ');
    newClass.push(className);
    el.className = newClass.join(' ');
  }
}

export function hasClass(el,className){
  let re = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return re.test(el.className);
}
