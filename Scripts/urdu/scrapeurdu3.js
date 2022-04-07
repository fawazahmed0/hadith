
// add debugging messages
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')
let browser
let hadithnames =['muslim','bukhari','abu-dawood','ibn-e-maja','nisai','tirmazi']

let mainLink = 'https://www.al-hadees.com/hadees-details/'
let hadithlinks = hadithnames.map(e=>mainLink+e+'/')
async function test(){

 

 

    browser = await chromium.launch({ headless: true});
   let promiseArr = []
    hadithlinks.forEach((link,index) => promiseArr.push(second(link,index)))
    await Promise.all(promiseArr)
   await browser.close()

}


async function second(link,indexno){
    let context = await browser.newContext();
    let page = await context.newPage();
    let arabicarr= []
    let urduarr = []
    let engarr = []
    let count = 0
    for(let i=1;;i++){
      if(count>10)
      break
        
    let res;   
    try{
     res = await page.goto(link+i,{timeout:60000});
    }catch(e){
        res = await page.goto(link+i,{timeout:60000});
    }
    try{
      await page.waitForSelector('text=Arabic Hadees Number')
    }catch(e){
      count++;
      continue

    }

      count=0
    

    try{
    let num = await page.locator('text=Arabic Hadees Number').textContent()
    let arabictext = await page.locator('content-arb-1').textContent()
    arabicarr.push(num+' | '+arabictext.replace(/\s\s+/g, ' ').trim())
    let urdutext = await page.locator('content-urd-1').textContent()
    urduarr.push(num+' | '+urdutext.replace(/\s\s+/g, ' ').trim())
    let engtext = await page.locator('content-eng-1').textContent()
    engarr.push(num+' | '+engtext.replace(/\s\s+/g, ' ').trim())
    }catch(e){}
    if(i%100==0){
         await context.close()
         context = await browser.newContext();
         page = await context.newPage();
    }


}

let mypath = path.join(__dirname,'hadith2')
fs.mkdirSync(mypath, {
    recursive: true
  });

  fs.writeFileSync(path.join(mypath,hadithnames[indexno]+'arabic.txt'),arabicarr.join('\n').trim())
  fs.writeFileSync(path.join(mypath,hadithnames[indexno]+'urdu.txt'),urduarr.join('\n').trim())
  fs.writeFileSync(path.join(mypath,hadithnames[indexno]+'english.txt'),engarr.join('\n').trim())
}

test()