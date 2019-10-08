var fs = require('fs')
function readFilePromise(path){
  return new Promise((resolve,reject) => {
    fs.readFile(path , (err,data) => {
      if (err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

function writeFilePromise(path,content) {
  
}


function promisify(callbackBasedFunction){
  return function(...args){
    return new Promise((resolve,reject) => {
      callbackBasedFunction(...args, (err,data) => {
        if (err){
          reject(err)
        }else{
          resolve(data)
        }
      })
      
    })
  }
}


function callbackify(promiseBased) {
  return function(...args) {
    
  }
}

function listAllFiles(dirpath) {
  
}