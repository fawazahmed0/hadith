
const path = require('path')
const fs = require('fs/promises')
const fg = require('fast-glob');

async function begin(){

  

  let files = await fg([path.posix.join('.','jsonnew','**')], { dot: true });

  for(let jsonfile of files.filter(e=>e.endsWith('.json'))){
   let data =  await fs.readFile(jsonfile, {encoding:'utf8'})
   data = JSON.parse(data).filter(e=>e.newhadithno!==undefined)

   let arr = []
 

   for(let i=0;i<data.length;i++){

    arr.push(`${data[i].newhadithno} | ${data[i].hadithBengali}`)

   }
   let bareEdition = jsonfile.split(path.posix.sep).at(-1).replace(/\.json$/gi, '')
   await fs.writeFile(path.join(__dirname,'jsonnew',`ben-${bareEdition}.txt`), arr.map(e=>e.replace(/\r?\n/gi, ' ' ).replace(/\s\s+/gi, ' ').trim()).join('\n'))
  }

  



}

begin()