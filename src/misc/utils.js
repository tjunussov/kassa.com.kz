// import Optimus from 'optimus-js'

String.prototype.initCap = function () {
   return this.toLowerCase().replace('г.','').replace(/(?:^|\s)[a-zа-я]/g, function (m) {
      return m.toUpperCase();
   });
};

String.prototype.hashCode = function(){
  var hash = 0;
  if (this.length != 0) {
    for (var i = 0; i < this.length; i++) {
        hash = ((hash<<5)-hash)+this.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }
  }
  return hash;
}

export const ArrayRemoveElement = (arr,item) => {
  let index = arr.indexOf(item);
  if(index !== -1) {
    arr.splice(index, 1);
  }
}

export const ArrayClone = (val) => {
  return JSON.parse(JSON.stringify(val))
}

// export const _optimus = new Optimus(1580030173, 59260789, 1163945558);
// export const obfuscate = val => {
//   return _optimus.encode(val);
// }
// export const deobfuscate = hash => {
//   return _optimus.decode(hash);
// }

export const  obfuscate = (val,salt="2018") => {
  val = (val>>>0).toString(2) // convert to binary
  val = val.padStart((salt>>>0).toString(2).length,'0') // pad 0s to start
  val = val.split("").reverse().join("") // reverse it
  val = parseInt(val,2) // convert to decimal
  val = salt ^ val // xor with salt
  return val
}

export const  deobfuscate = (val,salt="2018") => {
  val = salt ^ val // xor with salt
  val = (val>>>0).toString(2) // convert to binary
  val = val.padStart((salt>>>0).toString(2).length,'0') // pad 0s to start
  val = val.split("").reverse().join("") // reverse it
  val = parseInt(val,2) // convert to decimal
  return val
}