var fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function test(){
  // https://stackoverflow.com/questions/52478069/node-fetch-disable-ssl-verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let mypath =  path.join(__dirname,'scrapped')
let files = fs.readdirSync(mypath)
// Use bulk api instead for huge data
for(let file of files){
  let filePath = path.join(mypath,file)
    console.log(file)
    let str = fs.readFileSync(filePath).toString()
    let arr = str.split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.trim())
    let indexname = file.replace(/\.txt$/,'') + '4'
    for(let val of arr){
      try{
      let [val1,val2] = val.split(' | ')
      let myjson = {
        "column1":val1,
        "column2":val2
      }
      var requestOptions = {
        method: 'POST',
        headers: {"Authorization": "Basic ZWxhc3RpYzpYckQ1ZVhJb1hZVHp6KllkMGJSeA==",
                  "Content-Type": "application/json",
                  "Accept": "application/json"},
        redirect: 'follow',
        body:JSON.stringify(myjson)
      };
  

      let res = await fetch("https://localhost:9200/"+indexname+"/_doc", requestOptions)
      //let data = response.json()
      if(!res.ok)
      console.log('issue with file',file,val)
    }catch(e){console.error(e)}

    }

    //console.log(file,arr.slice(0,10))
    // fs.writeFileSync(filePath,arr.join('\n').trim())
}
}


test()



  