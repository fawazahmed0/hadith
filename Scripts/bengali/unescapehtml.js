const { chromium } = require('playwright');
const path = require('path')
const fs = require('fs/promises')
const fg = require('fast-glob');

let page, context
async function begin(){
  const browser = await chromium.launch();
  context = await browser.newContext()
  page = await context.newPage()

  

  let files = await fg([path.posix.join('.','jsonnew','**')], { dot: true });

  for(let jsonfile of files){
   let data =  await fs.readFile(jsonfile, {encoding:'utf8'})
   data = JSON.parse(data)

   for(let i=0;i<data.length;i++){

    if(i%500==0){
        console.log('closing context',jsonfile)
        await context.close()
        context = await browser.newContext()
        page = await context.newPage()
    }

    for(let key of Object.keys(data[i])){

        data[i][key] = await cleanuphtml(data[i][key])

    }


   }
   await fs.writeFile(jsonfile, JSON.stringify(data,null,4))
  }

  


  
  await browser.close();
}

async function cleanuphtml(str){
    return await page.evaluate(str => {
       let content = (new DOMParser()).parseFromString(str, "text/html").documentElement.textContent 
       document.body.insertAdjacentHTML('beforebegin', `<div id="mycontent">${content}</div>`)
       let data =  document.querySelector("#mycontent").textContent
       document.querySelector("#mycontent").remove();
       return data
    }, str);
}

begin()