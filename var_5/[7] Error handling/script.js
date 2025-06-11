'use strict'

function handleReferr(){
    for(let i = 0; i < 10; i++){
        let a = 1;
    }
    try{
        console.log(a)
    } catch (error){
        if(error instanceof ReferenceError){
            console.log('ERROR OCCURED!!!',error.message)
        } else {
            throw error;
        }
    }
}
handleReferr();