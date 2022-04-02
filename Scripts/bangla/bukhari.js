




const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path')


async function test(){

    const browser = await chromium.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();

    let banglaArr = []
    let englishArr = []

    let pagelink = 'https://www.hadithbd.com/hadith/chapter/?book=12'

    await page.goto(pagelink,{timeout:60000});
    let links = await page.evaluate(() => Array.from(document.querySelectorAll('a[href*="section="]')).map(e=>e.href))


    

  for(let link of links){
      await page.goto(link,{timeout:60000});
      while(true){
      await page.evaluate(() => Array.from(document.querySelectorAll('[lang="ar"]')).map(e=>e.remove()))
      let contentArr = await page.evaluate(() =>
      Array.from(
          document.querySelectorAll('.tab-content')).map(
              e=>{
                try{
                  return [e.parentNode.parentNode.querySelector('.badge').textContent,e.querySelector('[id^="hadithEnglish"]').textContent,e.querySelector('[id^="hadithBangla"]').textContent]
                }catch(e){
                  return ['','','']
                }
              }))
              
              contentArr.forEach(e=>{
                  englishArr.push(e[0].trim()+' | '+e[1].replace(/\r?\n/g, ' ').trim())
                  banglaArr.push(e[0].trim()+' | '+e[2].replace(/\r?\n/g, ' ').trim())
                })

                const nextbtn = await page.$$(".nav_next");
                if(nextbtn.length==0)
                    break
                
          
                  await page.click('.nav_next');
                  await page.waitForLoadState()
      }


  }

  // '০'

 

  fs.writeFileSync(path.join(__dirname,'bukharieng.txt'),englishArr.join('\n').trim())
  fs.writeFileSync(path.join(__dirname,'bukharibang.txt'),banglaArr.join('\n').trim())
    

 
  await browser.close();
  
}



  test()