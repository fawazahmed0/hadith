


const { firefox } = require('playwright');
const fs = require('fs');

async function test(){

    const browser = await firefox.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    let hadithbooks = ["malik"]
  //  await page.goto('https://sunnah.com/bukhari/12')
    //await page.evaluate(() => toggleLanguageDisplay('urdu'))

    for(let book of hadithbooks){
        let str = "";
        let ref = "";

        let str1 = ""
        let ref1 = ""
    for(let i=1;i<=1000;i++){

        let res = await page.goto('https://sunnah.com/'+book+'/'+i)
        if(!res.ok())
        break
        await page.waitForTimeout(4000)
        str ='\n'+str+'\n'+await page.evaluate(() =>Array.from(document.querySelectorAll('.actualHadithContainer')).map(e=>{
            let urdu = e.querySelector('.english_hadith_full') ? e.querySelector('.english_hadith_full').textContent : ''
            return urdu.replaceAll('\n',' ') + '\n'+e.querySelector('.hadith_reference').textContent.replaceAll('\n',' ')+'\n\n'
        }))
        ref ='\n'+ref+'\n'+await page.evaluate(() =>Array.from(document.querySelectorAll('.actualHadithContainer')).map(e=>e.querySelector('.hadith_reference').textContent.replaceAll('\n',' ')+'\n\n'))
      
        str1 ='\n'+str1+'\n'+await page.evaluate(() =>Array.from(document.querySelectorAll('.actualHadithContainer')).map(e=>e.querySelector('.arabic_hadith_full').textContent.replaceAll('\n',' ') + '\n'+e.querySelector('.hadith_reference').textContent.replaceAll('\n',' ')+'\n\n'))
        ref1 ='\n'+ref1+'\n'+await page.evaluate(() =>Array.from(document.querySelectorAll('.actualHadithContainer')).map(e=>e.querySelector('.hadith_reference').textContent.replaceAll('\n',' ')+'\n\n'))

    }
   

    fs.writeFileSync(book+'englishscrapped.txt',str)
    fs.writeFileSync(book+'englishreference.txt',ref)

    fs.writeFileSync(book+'arabicscrapped.txt',str1)
    fs.writeFileSync(book+'arabicreference.txt',ref1)
}
    await browser.close();
  
}

test()