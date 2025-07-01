'use strict'

for(let i = 0; i < 10; i++){
    let a = 1;
    const b = 2;
    var c = 3;
}
console.log(a)
console.log(b)
console.log(c) // отобразится только c, так как объявление через var позволяет получить доступ к переменной, даже если она локальная