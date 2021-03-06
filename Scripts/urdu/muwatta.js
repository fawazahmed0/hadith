




const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')

let contentArr = [[],[],[]]

async function test(){

    let browser = await chromium.launch({ headless: true});
     let context = await browser.newContext();
     let page = await context.newPage();

    let link = 'http://www.hadithurdu.com/08/8-1-'
    let count = 0
    for(let i=1;;i++){
        if(count>10)
        break
        if(i%1000==0){
            await context.close()
            context = await browser.newContext();
            page = await context.newPage();
       }
       console.log(i)
        try{
        let res = await page.goto(link+i,{timeout:60000});
        if(!res.ok())
            {
                count++;
                continue
            }else
            count=0;

        
        let arabic = await page.locator('.arabic-hadith').textContent()
        let english = await page.locator('.english-hadith').textContent()
        let urdu = await page.locator('.urdu-hadith').textContent()
        contentArr[0].push(i+' | '+arabic)
        contentArr[1].push(i+' | '+english)
        contentArr[2].push(i+' | '+urdu)
        }catch(e){}
    }

    // save data
    for(let i=0;i<3;i++){
        let mypath = path.join(__dirname,'muwatta')
        fs.mkdirSync(mypath, {
            recursive: true
          });

          fs.writeFileSync(path.join(mypath,i+'.txt'),contentArr[i].map(e=> (typeof e=="string") ? e.replace(/\r?\n/g,' ').replace(/\s\s+/g, ' ').trim():'').join('\n').trim())
    }

 
    

 
    await browser.close();
  
}

test()