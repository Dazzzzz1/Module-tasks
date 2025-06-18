'use strict'

function checkNum(data) {
  return new Promise((resolve, reject) => {
    if (typeof data !== 'number' || isNaN(data)) {
      reject('Error');
      return;
    }
    if (data % 2 === 0) {
      setTimeout(() => resolve('Even'), 2000);
    } else {
      setTimeout(() => resolve('Odd'), 1000);
    }
  });
}

checkNum(4)
  .then(result => console.log(result)) 
  .catch(error => console.log(error));