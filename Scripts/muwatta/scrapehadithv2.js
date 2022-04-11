


const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');

async function test(){

    const browser = await firefox.launch({ headless: true});
    const context = await browser.newContext();
    const page = await context.newPage();
    let hadithbooks = ["bukhari","muslim","nasai","abudawud","tirmidhi","ibnmajah","malik"]
  //  await page.goto('https://sunnah.com/bukhari/12')
    //await page.evaluate(() => toggleLanguageDisplay('urdu'))

    for(let book of hadithbooks){

        await page.goto('https://sunnah.com/'+book)
        
     let arr =    await page.evaluate(() => Array.from(document.querySelectorAll('.english_book_name')).map(e=>[e.parentNode.querySelector('.title_number').textContent,e.parentNode.querySelector('.english_book_name').textContent]))
        
    fs.writeFileSync(path.join(__dirname, book+'booksnames.json'),JSON.stringify(Object.fromEntries(arr.filter(e=>e[0]!=''))))

}
    await browser.close();
  
}

test()