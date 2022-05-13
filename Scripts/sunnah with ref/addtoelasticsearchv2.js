var fetch = require('node-fetch');

async function test(){
  // https://stackoverflow.com/questions/52478069/node-fetch-disable-ssl-verification
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let editionsJSON = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@latest/editions.min.json').then(res=>res.json())

let bareEditions = Object.keys(editionsJSON)

let langMap = {'ara':'arabic','eng':'english'}

for(let iso of Object.keys(langMap)){
  for(let bareEdition of bareEditions){
    let data = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@latest/editions/${iso}-${bareEdition}.min.json`).then(res=>res.json())
    let indexname = `${bareEdition}${langMap[iso]}5`

    for(let hadith of data.hadiths){
      try{
      let myjson = {
        "column1":hadith.hadithnumber,
        "column2":hadith.text.normalize("NFD").replace(/\p{Diacritic}/gu, "")
      }
      var requestOptions = {
        method: 'POST',
        headers: {"Authorization": "Basic ZWxhc3RpYzpYckQ1ZVhJb1hZVHp6KllkMGJSeA==",
                  "Content-Type": "application/json",
                  "Accept": "application/json"},
        redirect: 'follow',
        body:JSON.stringify(myjson)
      };
      let res = await fetch(`https://localhost:9200/${indexname}/_doc`, requestOptions)
      if(!res.ok)
      console.log('issue with file',myjson)

    }catch(e){console.error(e)}
    }

  }
}

}


test()



  