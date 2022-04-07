
// add debugging messages
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')
let browser
let hadithnames =['ibn-e-maja','nisai','tirmazi','muslim','bukhari','abu-dawood']

let mainLink = 'https://www.al-hadees.com/hadees/'
let hadithlinks = hadithnames.map(e=>mainLink+e+'/')
async function test(){

 

 

    browser = await chromium.launch({ headless: true});
   let promiseArr = []
    hadithlinks.forEach((link,index) => index<=2? promiseArr.push(second(link,index)) : '')
    await Promise.all(promiseArr)
    hadithlinks.forEach((link,index) => index>2? promiseArr.push(second(link,index)) : '')
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
     res = await page.goto(link+i+'/0',{timeout:60000});
    }catch(e){
        res = await page.goto(link+i+'/0',{timeout:60000});
        console.error(e)
    }
    try{
      await page.waitForSelector('text=/Hadees Number: \\d+ / Arabic Hadees No. \\d+/',{timeout:20000})
    }catch(e){
      console.error(e)
      count++;
      continue

    }

      count=0
    

    try{
      
    let num = await page.locator('.container >> text=/Hadees Number: \\d+ / Arabic Hadees No. \\d+/').allTextContents()
    let arabictextArr = await page.locator('.container [id^="content-arb-"]').allTextContents()
    arabictextArr = arabictextArr.map((e,i)=>num[i]+' | '+e.split(/\r?\n/).slice(0,-1).join(' ').replace(/\s\s+/g, ' ').trim())
    arabicarr = arabicarr.concat(arabictextArr)
    let urdutextArr = await page.locator('.container [id^="content-urd-"]').allTextContents()
    urdutextArr = urdutextArr.map((e,i)=>num[i]+' | '+e.split(/\r?\n/).slice(0,-1).join(' ').replace(/\s\s+/g, ' ').trim())
    urduarr = urduarr.concat(urdutextArr)
    let engtextArr = await page.locator('.container [id^="content-eng-"]').allTextContents()
    engtextArr = engtextArr.map((e,i)=>num[i]+' | '+e.split(/\r?\n/).slice(0,-1).join(' ').replace(/\s\s+/g, ' ').trim())
    engarr = engarr.concat(engtextArr)
    }catch(e){console.error(e)}
    if(i%100==0){
         await context.close()
         context = await browser.newContext();
         page = await context.newPage();
    }


}

await context.close()

let mypath = path.join(__dirname,'hadith2')
fs.mkdirSync(mypath, {
    recursive: true
  });

  fs.writeFileSync(path.join(mypath,hadithnames[indexno]+'arabic.txt'),arabicarr.join('\n').trim())
  fs.writeFileSync(path.join(mypath,hadithnames[indexno]+'urdu.txt'),urduarr.join('\n').trim())
  fs.writeFileSync(path.join(mypath,hadithnames[indexno]+'english.txt'),engarr.join('\n').trim())
}

test()