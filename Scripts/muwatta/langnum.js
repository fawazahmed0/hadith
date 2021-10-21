
const fs = require('fs');



function LangNum2Num(str, zeroFrom, zeroTo) {
  // Get the UTF-16 code points of zeros
  codezeroFrom = ("" + zeroFrom).codePointAt(0)
  codezeroTo = ("" + zeroTo).codePointAt(0)

  // Make array containing codepoints from 0 to 10 for the language
  var FromArr = [...Array(10).keys()].map(e => codezeroFrom + e)
  var ToArr = [...Array(10).keys()].map(e => codezeroTo + e)

  // Split the string into array, if we catch a number, we will return number from destination language
  return str.split('').map(e => FromArr.includes(e.codePointAt(0)) ? String.fromCodePoint(ToArr[FromArr.indexOf(e.codePointAt(0))]) : e).join('')

}



fs.writeFileSync('muwattagraded4.txt', LangNum2Num(fs.readFileSync('muwattagraded2.txt').toString(),"۰","0"));