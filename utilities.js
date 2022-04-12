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
  // values in arr is given first preferences & then by alphabetical order

    function sortInnerJSON(obj, arr=[],inner) {
 
      for(let key of Object.keys(obj)) {
          if(isObject(obj[key])) {
              obj[key] = sortJSON(obj[key])
              sortInnerJSON(obj[key],arr,true);
          }
  
      }
      obj = sortJSON(obj, arr)
      if(!inner) 
      return obj;
  
  }
  
  // values in arr is given first preferences & then by alphabetical order
    function sortJSON(jsonObj,arr=[]){
      let objectKeys = Object.keys(jsonObj)
      // sort numbers properly
      if(!yourArray.some(isNaN))
      objectKeys.sort((a, b) => a-b)
      else
      objectKeys.sort()

      return arr.concat(objectKeys).reduce(
          (obj, key) => { 
            if(jsonObj[key])
            obj[key] = jsonObj[key]; 
            return obj;
          }, 
          {}
        );
  
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
function logmsg(str, skipconsole) {
  fs.appendFileSync(path.join(process.argv[1].split(path.sep).slice(0,-1).join(path.sep),'log.txt'), str)
  if (!skipconsole)
    console.log(str)
}

function saveJSON(jsondata, pathToFile, indent) {
    if(indent)
    fs.writeFileSync(pathToFile,JSON.stringify(jsondata,null,indent))
    else
    fs.writeFileSync(pathToFile,JSON.stringify(jsondata))
  }
  function getJSONKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

// reads the file using streams, start is the starting byte and end is the bytes to read
async function streamRead(pathtofile, start, end) {
  var readstream;
  if (start && !end)
    readstream = fs.createReadStream(pathtofile, {
      start: start
    });
  else if (!start && end)
    readstream = fs.createReadStream(pathtofile, {
      end: end
    });
  else if (!start && !end)
    readstream = fs.createReadStream(pathtofile);
  else
    readstream = fs.createReadStream(pathtofile, {
      start: start,
      end: end
    });

  var data = ''
  for await (var chunk of readstream) {
    data = data + chunk.toString()
  }
  return data
}


// searches the string in whole linebyline database
function search(arr) {
  var found = false
  for (var val of arr) {
    for (var filename of fs.readdirSync(linebylineDir)) {
      var content = fs.readFileSync(path.join(linebylineDir, filename)).toString();
      str = cleanify(val)
      content = cleanify(content)

      if (content.includes(str)) {
        logmsg("\n Line: " + val + " contains in edition \n" + filename.replace(/(\.[^\.]*$)/i, ""))
        found = true
      }
    }
  }
  if (!found)
    logmsg("\n No edition found in the database")
}




module.exports = {
  search,streamRead,sortJSON,sortInnerJSON,getJSONKeyByValue,renameInnerJSONKey,saveJSON, renameJSONKey,isObject,capitalize,getJSON,getJSONInArray,dirCheck,isoLangMap,readDBTxt,isValidJSON,cleanifyObject,logmsg
};
