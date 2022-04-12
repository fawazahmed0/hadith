//const {firefox} = require('playwright');
const fs = require('fs');
const path = require('path')
const fetch = require('node-fetch');



function renameInnerJSONKey(obj, oldKey, newKey){

    for(let [key, value] of Object.entries(obj)){
        if(isObject(value))
            renameInnerJSONKey(value, oldKey, newKey)
        if(key == oldKey)
            renameJSONKey(obj, oldKey, newKey)
    }
    }



function renameJSONKey ( obj, oldKey, newKey ) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }


function isObject(obj) {
    return obj === Object(obj);
  }


const capitalize = words => words.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, match => match.toUpperCase()).trim()

async function getJSON(path, isLink){
    if(isLink)
    return await fetch(path).then(res => res.json())
    return JSON.parse(fs.readFileSync(path).toString())
}

// gets the JSON from end of array, returns [jsondata, i], where i is the position from end where jsondata was parsed successfully
function getJSONInArray(arr) {
    var i = 0
    while (!isValidJSON(arr.slice(--i).join('\n')) && i > -100);
    if (i != -100)
      return [JSON.parse(arr.slice(i).join('\n')), i]
  }

// Generates the json with standard naming conventions
async function generateJSON(arr, newjson, editionName) {

    var isocode = newjson['iso']
    // Deleting iso key, as it might create a bug in the future, as this key was added later to solve an issue in actions enviroment
    delete newjson['iso']
    // capitalize first letters
    newjson['language'] = capitalize(newjson['language'])
    // If values are undefined we will assign it as empty string
    newjson['author'] = newjson['author'] || "unknown"
  
    // Removing special symbols and diacritics from authors name
    newjson['author'] = newjson['author'].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Za-z\s\.\,]+/gi, " ").replace(/\s\s+/gi, " ").toLowerCase().trim()
    newjson['author'] = capitalize(newjson['author'])
  
    // If values are undefined we will assign it as empty string
    newjson['source'] = newjson['source'] || ""
    newjson['comments'] = newjson['comments'] || ""
  
  
    // Number of chars to consider in author name for editionName creation
    var authorSize = 15
    // Take first few chars of like 10chars for author to make editionName
    // editionName will be a foldername and also part of url, so cannot have anything other than latin alphabets
    if (!editionName)
      editionName = isocode + "-" + newjson['author'].toLowerCase().replace(/[^A-Za-z]+/gi, "").substring(0, authorSize);
  
    // first check file with same endpoint exists or not in editions.json, if there then we will add 1 to the editionname and check again
    for (var i = 1;; i++) {
      // If a filename with same edition name exists in database then add number to the editionName
      if (jsondb[editionName + '.txt'] || jsondb[editionName + '-la.txt'] || jsondb[editionName + '-lad.txt']) {
        // Fetch the number if exists in the editionName
        var Num = editionName.match(/\d+$/) || [0]
        Num = parseInt(Num[0])
        // Increment that number if it exists to get a new editionName
        editionName = editionName.replace(/\d+$/, "") + (Num + 1);
      } else
        break;
    }
  
    newjson['name'] = editionName
    newjson['link'] = url + editionsFolder + "/" + editionName + ".json"
    newjson['linkmin'] = url + editionsFolder + "/" + editionName + ".min.json"
    newjson['direction'] = await dirCheck(arr.slice(0, 10).join('\n'))
  
    // JSON in sorted order
    var sortjson = {}
    sortjson['name'] = newjson['name']
    sortjson['author'] = newjson['author']
    sortjson['language'] = newjson['language']
    sortjson['direction'] = newjson['direction']
    sortjson['source'] = newjson['source']
    sortjson['comments'] = newjson['comments']
    sortjson['link'] = newjson['link']
    sortjson['linkmin'] = newjson['linkmin']
  
    return sortjson
  }

// This function checks the direction of the language and returns either rtl or ltr
// https://playwright.dev/#version=v1.3.0&path=docs%2Fcore-concepts.md&q=evaluation
async function dirCheck(str,page) {
    var result = await page.evaluate(str => {
      var divelem = document.createElement("div");
      divelem.dir = "auto"
      divelem.innerHTML = str;
      document.body.appendChild(divelem)
      return window.getComputedStyle(divelem).getPropertyValue('direction')
    }, str);
    return result
  }
  
  // Returns the iso name ,iso2 of the language
function isoLangMap(arrval) {
    for (var [lang, val] of Object.entries(isocodes)) {
      if (arrval[0].toLowerCase().replace(/[^A-Za-z\(\)]+/gi, "").trim() == lang.toLowerCase().replace(/[^A-Za-z\(\)]+/gi, "").trim())
        return [lang, val.iso2]
    }
    if (arrval[1]) {
      for (var [lang, val] of Object.entries(isocodes)) {
        if (val.iso1 == arrval[1] || val.iso2 == arrval[1])
          return [lang, val.iso2]
      }
    }
  }
 // reads the text file and returns [originalarr, filtererdarr, cleanarr jsondata]
// orignalarr  orignalfile as arr,
// filtererdarr - No empty lines in it
// cleanarr  cleans the translation from patterns etc
// jsondata - JSON data at the end of file, return undefined if doens't exists
function readDBTxt(pathToFile) {
    var orgarr = fs.readFileSync(pathToFile).toString().split(/\r?\n/)
    // now remove all lines with empty strings or spaces or tabs
    // https://stackoverflow.com/a/281335
    // return elememnt only if they are not spaces/tabs and emptyline
  //  var filterarr = orgarr.filter(elem => !/^\s*$/.test(elem))
    // search & validate JSON in array
    var temp = getJSONInArray(orgarr)
    // If the json exists, then Remove the json from the file
    if (Array.isArray(temp))
        orgarr = orgarr.slice(0, temp[1])
       // validates the translation for mistakes such as extra newline etc and corrects it and clean the translation from any number patterns ,etc
        cleanarr = validateCleanTrans(orgarr, path.basename(pathToFile))
  // If the json exists then return json with the array
  if (Array.isArray(temp))
      return [orgarr, cleanarr , temp[0]]
  // return without json
  return [orgarr, cleanarr]
  } 
// function which checks whether a string is valid json or not
function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  // cleans the json
function cleanifyObject(jsondata) {
    // lowercase for all json , trimming white spaces and also removing empty json and also cleaning the keys and values
    //https://stackoverflow.com/a/54985484/2437224
    var newjson = Object.fromEntries(
      Object.entries(jsondata).map(([k, v]) => {
        if (v != undefined && v)
          return ["" + k.replace(/[^A-Za-z]+/gi, "").trim().toLowerCase(), "" + v.replace(/\s\s+/gi, " ").trim()]
        return ["", ""]
      })
    );
    // removing empty keys
    delete newjson[""]
    return newjson
  }

 // Stores all the log, to help in reviewing PR and checking for any mistake by the user
function logmsg(str,logPath, skipconsole) {
    fs.appendFileSync(logPath, str)
    if (!skipconsole)
      console.log(str)
  } 
module.exports = {
    renameInnerJSONKey, renameJSONKey,isObject,capitalize,getJSON,getJSONInArray,generateJSON,dirCheck,isoLangMap,readDBTxt,isValidJSON,cleanifyObject,logmsg
};
