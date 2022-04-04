
// add debugging messages
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')
let browser
let hadithnames =['bukhari','muslim','abudawud','ibnmajah','nasai','tirmidhi']
let hadithlinks = [
  'https://muhammad.pk/sahih-bukhari-',
  'https://muhammad.pk/sahih-muslim-',
  'https://muhammad.pk/sunan-abu-dawood-',
    'https://muhammad.pk/sunan-ibn-majah-',
       'https://muhammad.pk/sunan-an-nasai-',
      'https://muhammad.pk/jami-at-tirmidhi-',
]
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
    let count = 0
    for(let i=1;;i++){
        
    let res;   
    try{
     res = await page.goto(link+i,{timeout:60000});
    }catch(e){
        res = await page.goto(link+i,{timeout:60000});
    }
    if(!res.ok()){
    count++;
    continue
    }else
      count=0
    
    if(count>10)
    break
    try{
    let arabictext = await page.locator('h5').textContent()
    arabicarr.push(i+' | '+arabictext.replace(/\s\s+/g, ' ').trim())
    let urdutext = await page.locator('h4').textContent()
    urduarr.push(i+' | '+urdutext.replace(/\s\s+/g, ' ').trim())
    }catch(e){}
    if(i%100==0){
         await context.close()
         context = await browser.newContext();
         page = await context.newPage();
    }


}

let mypath = path.join(__dirname,'hadith')
fs.mkdirSync(mypath, {
    recursive: true
  });

  fs.writeFileSync(path.join(mypath,hadithnames[0]+'arabic.txt'),arabicarr.join('\n').trim())
  fs.writeFileSync(path.join(mypath,hadithnames[0]+'urdu.txt'),urduarr.join('\n').trim())

}

test()