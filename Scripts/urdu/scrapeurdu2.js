
// add debugging messages
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')
let browser
async function test(){

    let hadithlinks = [
     //  'https://muhammad.pk/sahih-bukhari-',
       'https://muhammad.pk/sahih-muslim-',
    //   'https://muhammad.pk/sunan-abu-dawood-',
      //   'https://muhammad.pk/sunan-ibn-majah-',
        //    'https://muhammad.pk/sunan-an-nasai-',
         //   'https://muhammad.pk/jami-at-tirmidhi-',
   ]

    browser = await chromium.launch({ headless: true});
   let promiseArr = []
    hadithlinks.forEach(link => promiseArr.push(second(link)))
    await Promise.all(promiseArr)
   await browser.close()

}


async function second(link){
    let context = await browser.newContext();
    let page = await context.newPage();
    let arabicarr= []
    let urduarr = []
    for(let i=4679;;i++){
        
    let res;   
    try{
     res = await page.goto(link+i,{timeout:60000});
    }catch(e){
        res = await page.goto(link+i,{timeout:60000});
    }
    if(!res.ok())
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

  fs.writeFileSync(path.join(mypath,'1ara'+link.split('/').slice(-1)[0]+'.txt'),arabicarr.join('\n').trim())
  fs.writeFileSync(path.join(mypath,'1urdu'+link.split('/').slice(-1)[0]+'.txt'),urduarr.join('\n').trim())

}

test()