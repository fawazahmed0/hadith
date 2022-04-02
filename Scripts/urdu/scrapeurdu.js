

// add debugging messages
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')

async function test(){

    let hadithlinks = [
     //   'https://www.urdupoint.com/islam/hadees-detail/sahih-bukhari/hadees-no-34447.html',
  //      'https://www.urdupoint.com/islam/hadees-detail/sahih-muslim/hadees-no-31716.html',
  'https://www.urdupoint.com/islam/hadees-detail/sahih-muslim/hadees-no-2.html',
'https://www.urdupoint.com/islam/hadees-detail/sunan-abi-dawud/hadees-no-5.html',
'https://www.urdupoint.com/islam/hadees-detail/sunan-ibn-majah/hadees-no-6.html',
'https://www.urdupoint.com/islam/hadees-detail/sunan-nisai/hadees-no-10.html',
'https://www.urdupoint.com/islam/hadees-detail/sunan-at-tirmidhi/hadees-no-16.html',
'https://www.urdupoint.com/islam/hadees-detail/sahih-bukhari/hadees-no-1.html'
]

    let browser = await chromium.launch({ headless: true});
    let context = await browser.newContext();
    let page = await context.newPage();
    let arabicText = 'Hadith in Arabic'
    let urduText = 'Urdu Translation'
    let englishText = 'English Translation'
    let textArr = [arabicText,urduText,englishText]
    
    let count = 0;
    
    for(let link of hadithlinks){
        console.log(link)
        let valueArr = [[],[],[]]
        while(true){

         try{   
        try{

        await page.goto(link,{timeout:60000});
        }catch(e){
            await page.goto(link,{timeout:60000}); 
        }
        await page.waitForSelector('text='+arabicText)
        let hadithno = await page.evaluate(e => document.querySelector('.surah_detail_info span').textContent)
        console.log(hadithno)
        for(let i=0;i<3;i++){
            try{
        let handle = await page.$('text='+textArr[i]);
        let value = await page.evaluate(e => e.nextElementSibling.textContent, handle);
        value = value.replace(/\s\s+/g, ' ').trim()
        valueArr[i].push(hadithno+' | '+value)
            }catch(e){console.error(e)}
        }

    }catch(e){console.error(e)}
        try{
        link = await page.locator('text=Next Hadith').getAttribute('href')
        }catch(e){break}
   
        count++

        //fix memory problem
        if(count%100==0){
            await browser.close();
             browser = await chromium.launch({ headless: true});
             context = await browser.newContext();
             page = await context.newPage();
        }



    }

    // save data

    for(let i=0;i<3;i++){
        console.log('saving')
        let mypath = path.join(__dirname,'hadith',link.split('/').slice(-2)[0])
        fs.mkdirSync(mypath, {
            recursive: true
          });

          fs.writeFileSync(path.join(mypath,textArr[i]+'.txt'),valueArr[i].join('\n').trim())

    }



    }
 
    await browser.close();
  
}

test()