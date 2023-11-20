const { firefox } = require('playwright');
const fs = require('fs/promises')
const path = require('path')

async function begin() {
    const browser = await firefox.launch({headless:true});
    const page = await browser.newPage();
    let mainLink = 'https://isnad.link/book/sunan-abu-dauda'
    await page.goto(mainLink)
    let links = await page.evaluate(()=> Array.from(document.querySelectorAll('body > section > div.container.book > div > div > ul > li > a')).map(e=>e.href))
    links = links.slice(1)
    let json = {}
    let count = 0

    for(let link of links){
        await page.goto(link)
                // remove all bab etc
    await page.evaluate(()=> Array.from(document.querySelectorAll('body > section > div.container.articles > div > div.column.is-hidden-mobile > article > div > p:nth-child(1)')).map(e=>e.textContent=''))

    let columns = await page.evaluate(()=> Array.from(document.querySelectorAll('.columns')).map(e=>e.querySelectorAll('.column')).filter(e=>e.length==2).slice(1).map(e=>Array.from(e).map(e=>e.textContent)))

    for(let column of columns){

     // change arabic numbers to english numbers 
     column = column.map(e=>LangNum2Num(e, '٠', 0)).reverse()
     let [columnRegexResultOne, columnRegexResultTwo]= column.map(e=>Array.from(e.matchAll(/(?<num>\d+)\s*(:|\[|\]|\p{Pd})/dugsi)))

     for(let resultOneIndex=0;resultOneIndex<columnRegexResultOne.length;resultOneIndex++){
        let resultOne = columnRegexResultOne[resultOneIndex]
        let numOne = resultOne.groups.num
        let resultOneText = resultOne.input.slice(resultOne.index,columnRegexResultOne?.[resultOneIndex+1]?.index).trim()

        if( /\d+.{0,10}باب/gi.test( removeDiacritics(resultOneText) ) )
        continue


        let resultTwoIndex = columnRegexResultTwo.findIndex(e=>e.groups.num==numOne)
        if(resultTwoIndex===-1)
        continue
        let resultTwo = columnRegexResultTwo[resultTwoIndex]


        let resultTwoText = resultTwo.input.slice(resultTwo.index, columnRegexResultTwo?.[resultTwoIndex+1]?.index).trim()

        if(!json[numOne])
        json[numOne] = []


        json[numOne].push(resultOneText)
        json[numOne].push(resultTwoText)


     }



        

    }
   // if(count++==2)
  //  break

    }

    await fs.writeFile(path.join(__dirname, mainLink.split('/').at(-1)+'.json'), JSON.stringify(json,null,4))
    await browser.close();
}

begin()

function removeDiacritics(str){
    return str.normalize("NFD").replace(/\p{Diacritic}|\p{Mark}|\p{Extender}|\p{Bidi_Control}/gu, "").replaceAll('ٱ','ا')
  }

function LangNum2Num(str, zeroFrom='٠', zeroTo=0) {
    // Get the UTF-16 code points of zeros
    codezeroFrom = ("" + zeroFrom).codePointAt(0)
    codezeroTo = ("" + zeroTo).codePointAt(0)
  
    // Make array containing 0 to 10 for the language
    var FromArr = [...Array(10).keys()].map(e => codezeroFrom + e).map(e => String.fromCodePoint(e))
    var ToArr = [...Array(10).keys()].map(e => codezeroTo + e).map(e => String.fromCodePoint(e))
  
  
    
    for(let i=0;i<FromArr.length;i++)
       str=str.replaceAll(FromArr[i], ToArr[i])
  
  
    return str
  
  }