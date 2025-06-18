'use strict'
 
function getArray(string){
    let arr = string.trim().split(' ');
    return arr;
}
console.log(getArray(' hello world '))