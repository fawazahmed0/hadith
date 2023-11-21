
const fs = require('fs/promises')
const path = require('path')

async function begin(){

  let fileName = 'bukhari.json'
  let indexName = `${fileName.replace(/\.json/i, '')}arabic`
  let pathToFile = path.join(__dirname, fileName)
  let content = await fs.readFile(pathToFile)
  content = JSON.parse(content).flat()

  let lastHadithNo = 0

  let bigArr = []

  for(let value of content){


    let jsonSearchResult = await search(value?.[0], indexName)
    let hadithNo = await getHadithNo(jsonSearchResult, lastHadithNo)

    if(!hadithNo)
    continue
    lastHadithNo = hadithNo
    value.push(hadithNo)
    bigArr.push(value)
  }

  

  await fs.writeFile(path.join(__dirname, 'compiled5', fileName.replace(/\.json/i, '')+'.txt'), bigArr.map(e=>`${e[2] || e[3]} | ${e[1]}`).join('\n'))




}
begin()

function getHadithNo(jsonSearchResult, lastHadithNo){

  return jsonSearchResult?.hits?.hits
  ?.map(e=>[e?._source?.column1, Math.abs(e?._source?.column1-lastHadithNo)]).
  sort((a,b)=>a[1]-b[1])?.[0]?.[0]

}

async function search(text, indexName){

    let queryBody = {
        "query": {
          "match": {
            "column2": 
            text?.normalize("NFD")?.replace(/\p{Diacritic}|\p{Mark}|\p{Extender}|\p{Bidi_Control}/gu, "")
          }
        }
      }

      let requestOptions = {
        method:"POST",
         headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
        },
         body:JSON.stringify(queryBody)
       }
      
    let response = await fetch(`http://localhost:9200/${indexName}/_search`, requestOptions)
    let data = await response.json()

    return data


}