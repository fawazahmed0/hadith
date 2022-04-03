var fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let mypath =  path.join(__dirname,'hadith')
    let files = fs.readdirSync(mypath)

    var requestOptions = {
        headers: {"Authorization": "Basic ZWxhc3RpYzpYckQ1ZVhJb1hZVHp6KllkMGJSeA=="},
      }
      let middlename = 'arabic'
    for(let file of files){
        console.log(file)
        
        let indexname = file.replace('.json','') + middlename+'scrapped3'
      let filePath = path.join(mypath,file)
        let str = fs.readFileSync(filePath).toString()
        let json = JSON.parse(str)
        let arr = []
        console.log('indexname',indexname)
        for(let val of json){
            try{
            let res = await fetch("https://localhost:9200/"+indexname+"/_search?q="+encodeURIComponent(val.arab), requestOptions)
            if(!res.ok)
            console.log("issue with val",val)
            let data = await res.json()
            let hadithno = data.hits.hits[0]._source.column1
            let hadith = val.id
            arr.push(hadithno+' | '+hadith.trim())
            }catch(e){console.error(e)}
        }

        fs.writeFileSync(path.join(mypath,file.replace('.json','.txt')),arr.join('\n').trim())
    }


}
test()