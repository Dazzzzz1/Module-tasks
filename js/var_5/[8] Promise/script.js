'use strict'

const firstPromise = new Promise((resolve) => {
  resolve(5); 
});
firstPromise
  .then((result) => {
    console.log("Первый:", result);
    return new Promise((resolve) => {
      setTimeout(() => {
        const squared = result * result;
        console.log("Второй:", squared);
        resolve(squared);
      }, 3000);
    });
  })
  .then((result) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const squared = result * result;
        console.log("Третий:", squared);
        resolve(squared);
      }, 3000);
    });
  })
  .then((final) => {
    console.log("Итог:", final);
  });