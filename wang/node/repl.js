const repl = require('repl')
const axios = require('axios')

async function getDef(word){
  var data = (axios.get('http://4.cddm.me:5001/word/${word}')).data
  try{
    return data[0].senses[0].defs[0].defcn
  } catch(e){
    return '查无此词'
  }
}

var arg = process.argv[2]

if (arg){
  getDef(arg).then(def => {
    console.log(def)
  })
}else{
  repl.start({
    prompt:'> ',
    eval: async function(word,context,filename,callback){
      if (word.trim() == ''){
        callback(null)
        return 
      }
      if (word.trim() == '.exit'){
        process.exit()
      }
      var def = await getDef(word)
      callback(null,def)
    }
  })
}