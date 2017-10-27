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

export function getAttr(el,name,val){
  let prefix = "data-";
  name = prefix + name;
  if(val){
    return el.setAttribute(name,val);
  }else{
    return el.getAttribute(name);
  }
}
