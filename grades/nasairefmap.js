const fs = require('fs');
const path = require('path');


async function test(){

    let str = fs.readFileSync(path.join(__dirname, 'ref', 'nasaireference.txt')).toString()

    let grades = fs.readFileSync(path.join(__dirname, 'hadithfiles', 'nasai','Zubair Ali Zai.txt')).toString().split(/\r?\n/).filter(elem => !/^\s*$/.test(elem)).map(e=>e.split(' | '))


    let refArr = [...str.matchAll(/Reference.*?(\d+).*?\d+.*?\d+.*?\d+.*?\d+.*?(\d+)/g)]

    let map = {}

    for(let ref of refArr)
        map[ref[2]] = ref[1]
    

    for(let i=0;i<grades.length; i++)
        grades[i][0] = map[grades[i][0]]
    

    fs.writeFileSync(path.join(__dirname, 'nasaireference.json'), JSON.stringify(map))
    fs.writeFileSync(path.join(__dirname, 'nasaizubai.txt'), grades.map(e=>e.join(' | ')).join('\n').trim())

}
test()
