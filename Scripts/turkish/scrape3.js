const { firefox } = require('playwright');
const fs = require('fs');
const path = require('path');
// Rerun this again, after fixing all bugs
async function test(){
  const browser = await firefox.launch({ headless: true });
  const page = await browser.newPage();
   let urlPartsObj = {'dvd':'abudawud','buh':'bukhari','mus':'muslim','tir':'tirmidhi','muvat':'malik','NES-KÜB':'nasai','İBN-M':'ibnmajah'}
   let urlParts = Object.keys(urlPartsObj)
  // let urlParts = ['NES-KÜB']
  //let urlParts = ['buh','mus','tir','muvat','NES-KÜB','İBN-M']
  let previousURL;
  let currentURL;
  for (let urlPart of urlParts) {
      let bigarr = []
  await page.goto(`http://www.normalift.com/kitap/files/${urlPart}/had/001/0001.htm`)
  currentURL = await page.url();

  while(previousURL != currentURL){
  console.log(currentURL)
  let tempArr =   await page.evaluate(() => {

        let myarr = []
        let arabicSelector = '.section1 p[class="MsoNormal"][dir="RTL"]:not([align="right"])'
        let turkishSelector = 'p[class="MsoNormal"]:not([dir="RTL"]):not([align="right"])'
        
        while(document.body.contains(document.querySelector(arabicSelector)) && document.body.contains(document.querySelector(`${arabicSelector} + ${turkishSelector}`))){
            let araElem = document.querySelector(arabicSelector)

            let arabicText = araElem.textContent + ' '
            while(araElem.nextElementSibling && araElem.nextElementSibling.matches(arabicSelector) && !araElem.nextElementSibling.matches(turkishSelector)){
                arabicText+= araElem.nextElementSibling.textContent + ' '
                araElem.nextElementSibling.remove()
            }
        
           let turkishElem = document.querySelector(`${arabicSelector} + ${turkishSelector}`)
           let turkishText = turkishElem.textContent + ' '
            while(turkishElem.nextElementSibling && turkishElem.nextElementSibling.matches(turkishSelector) && !turkishElem.nextElementSibling.matches(arabicSelector)){
                let newTurkishText = turkishElem.nextElementSibling.textContent.trim()
                turkishElem.nextElementSibling.remove()
                if(newTurkishText.startsWith('AÇIKLAMA:') || newTurkishText.startsWith('İzah:'))
                    break
        
                turkishText+= newTurkishText + ' '
            }
        
            araElem.remove()
            turkishElem.remove()
            myarr.push([arabicText.replace(/\s+/ig,' ').trim(), turkishText.replace(/\s+/ig,' ').trim()])
          
        }
        return myarr;

    });

bigarr = bigarr.concat(tempArr)
previousURL = currentURL;
try{
await page.locator('a :text(">>")').first().click();
}catch(e){
    let num = parseInt(currentURL.split('/').at(-1).replace('.htm','')) + 1
    let newURL = currentURL.split('/').slice(0,-1).join('/') + '/' + (num.toString()).padStart(4, '0')+'.htm'
    await page.goto(newURL)
}

try{await page.waitForURL(URL => URL != previousURL),{waitUntil:'networkidle'}}catch(e){console.error(e)}
currentURL = await page.url();


  }

fs.writeFileSync(path.join(__dirname, `${urlPartsObj.urlPart}arabic.txt`), bigarr.map(e=>e[0]).join('\n').trim())
fs.writeFileSync(path.join(__dirname, `${urlPartsObj.urlPart}turkish.txt`), bigarr.map(e=>e[1]).join('\n').trim())
  }


  await browser.close();




}
test()