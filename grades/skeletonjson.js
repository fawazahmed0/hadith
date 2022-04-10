
const fs = require('fs');
const path = require('path')
async function test(){


let books = {'abudawud':5274,'muslim':7563,'bukhari':7563,'malik':1858,'ibnmajah':4341,'nasai':5758,'tirmidhi':3956}




let newbooks = {}

for(let book of Object.keys(books).sort())
newbooks[book] = books[book]

let skeletonJSON = {}
skeletonJSON["editions"] = {}

for(let [book,num] of Object.entries(newbooks)){
    skeletonJSON["editions"][book] = {}
    skeletonJSON["editions"][book]["hadiths"] = {}
    for(let i = 1; i <= num; i++){
        skeletonJSON["editions"][book]["hadiths"][i] = {}
        skeletonJSON["editions"][book]["hadiths"][i]["arabicnumber"] = parseFloat(i)
        skeletonJSON["editions"][book]["hadiths"][i]["hadithnumber"] = parseFloat(i)

        skeletonJSON["editions"][book]["hadiths"][i]["grades"] = []
    }
}

fs.writeFileSync(path.join(__dirname,'skeleton.json'),JSON.stringify(skeletonJSON,null,'\t'))

}

test()