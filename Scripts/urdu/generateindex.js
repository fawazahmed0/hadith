var fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
let bookArr = ['abudawud','bukhari','ibnmajah','malik','muslim','nasai','tirmidhi']
async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let mypath =  path.join(__dirname,'hadith')
   // let files = fs.readdirSync(mypath)


      let middlename = 'arabic'
    for(let file of bookArr){
        let indexname = file + middlename+'scrapped3'

      let filePath1 = path.join(mypath,file+'urdu.txt')
      let filePath2 = path.join(mypath,file+'arabic.txt')
        let arr1 = fs.readFileSync(filePath1).toString().trim().split(/\r?\n/)
        let arr2 = fs.readFileSync(filePath2).toString().trim().split(/\r?\n/)
        let arr = []
        console.log('indexname',indexname)
      //  let lasthadithno = 1;
        for(let i=0;i<arr1.length;i++){
          let hadithno = '9999999'
            try{
              //await new Promise(r => setTimeout(r, 500));
              let jsonval = {
                "query": {
                  "match": {
                    "column2": arr2[i].replace(/^\d+\s+\|/,' ').trim()
                  }
                }
              }
              var requestOptions = {
                method:"POST",
                 headers: {"Authorization": "Basic ZWxhc3RpYzpYckQ1ZVhJb1hZVHp6KllkMGJSeA==",
                 "Content-Type": "application/json",
                 "Accept": "application/json"},
                 body:JSON.stringify(jsonval)
               }
            let res = await fetch("https://localhost:9200/"+indexname+"/_search", requestOptions)
            if(!res.ok)
            console.log("issue with val")
            let data = await res.json()
 
            hadithno = data.hits.hits[0]._source.column1
            hadithno = alpha2num(hadithno)
        //    if(Math.abs(hadithno - lasthadithno) > 10)
        //    throw 'issue with hadith no '+hadithno+ " diff is "+(hadithno - lasthadithno)
         //   lasthadithno = hadithno
            }catch(e){console.error(e)}
            //console.log('hadith no is',hadithno)
            arr.push(hadithno+' | '+arr1[i].replace(/^\d+\s+\|/,' ').trim())
        }

        fs.writeFileSync(path.join(mypath,'..',file+'.txt'),arr.join('\n').trim())
    }


}

function alpha2num(str){
  let val =  str.match(/(\d+)([a-z])/)
   if(val)
       return val[1] +'.' + (val[2].charCodeAt(0)-96)
       return str
}

test()