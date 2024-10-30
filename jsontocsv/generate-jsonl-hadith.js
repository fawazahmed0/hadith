// To generate huggingface dataset
// push using Dataset.from_pandas(df).push_to_hub("user/reponame", token="",max_shard_size="100GB")
const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')
const readline = require('node:readline')
const stream = require("stream")
const { pipeline } = require('node:stream/promises');

async function begin() {

    let editionsJSON = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions.json').then(res => res.json())
    for (let editionVal of Object.values(editionsJSON).map(e => e.collection).flat()) {
        let json = await fetch(editionVal.linkmin).then(res => res.json())
        let arr = []
        for (let hadith of json.hadiths) {
            let myhadith = structuredClone(hadith)
            myhadith = { bookname: json.metadata.name, ...myhadith, ...Object.fromEntries(myhadith.grades.map(e => Object.values(e))), ...myhadith["reference"] }
            myhadith = { ...myhadith, section: json?.metadata?.sections?.[myhadith?.["book"]], ...editionVal }
            delete myhadith["grades"]
            delete myhadith["reference"]
            arr.push(myhadith)
        }
        await saveNDJSON('./hadith-dataset.jsonl', arr, true)
    }
}
begin()

// the json should be in records format i.e [{column1:value,column2:value},{column1:value,column2:value},...]
async function saveNDJSON(pathToSave, json, append = false) {
    await pipeline(
        stream.Readable.from(json.map(e => JSON.stringify(e) + '\n')),
        fsSync.createWriteStream(pathToSave, { flags: append ? 'a' : 'w' }),
    )
}

async function getNDJSON(pathToNDJSON) {
    let arr = []
    const rl = readline.createInterface({
        input: fsSync.createReadStream(pathToNDJSON),
        crlfDelay: Infinity,
    })
    for await (const line of rl)
        arr.push(JSON.parse(line))
    return arr
}
