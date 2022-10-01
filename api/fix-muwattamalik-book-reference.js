const path = require('path')
const fs = require('fs')
const {
    mode, cleanify,replaceInnerJSON,replaceJSON,streamRead,sortJSON,getJSONKeyByValue,renameInnerJSONKey,saveJSON, renameJSONKey,isObject,capitalize,getJSON,getJSONInArray,dirCheck,isoLangMap,readDBTxt,isValidJSON,cleanifyObject,logmsg
    } = require('./utilities.js')

async function begin(){
    let metaPath = path.join(__dirname, 'info.json')
    let metainfo = await getJSON(metaPath)
    let bookno=0
    let refno;

    for(let i =0;i<metainfo['malik']['hadiths'].length;i++){

        if(bookno != metainfo['malik']['hadiths'][i]['reference']['book']){
         bookno = metainfo['malik']['hadiths'][i]['reference']['book']
         refno = metainfo['malik']['hadiths'][i]['hadithnumber'] - 1
        }
        metainfo['malik']['hadiths'][i]['reference']['hadith'] =  metainfo['malik']['hadiths'][i]['hadithnumber'] - refno
    }

    saveJSON(metainfo, path.join(__dirname, 'test.json'),'\t')

}
begin()
