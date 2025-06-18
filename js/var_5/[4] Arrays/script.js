'use strict'

function getMin(arr){
    let min = arr[0];
    for (let i = 0; i< arr.length; i++){
        if (arr[i] < min){
            min = arr[i];
        }
    }
    return min;
}
console.log(getMin([1,9,2]))