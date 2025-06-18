'use strict'

function getUnique(string) {
    const arr = string.split(',');
    const unique = arr.filter(item => 
        arr.indexOf(item) === arr.lastIndexOf(item)
    );
    return unique[0] || null;
}

console.log(getUnique('c,b,c,b,a')); 