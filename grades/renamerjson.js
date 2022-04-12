
const path = require('path');
const fs = require('fs');


async function test(){
    let gradesJSON = JSON.parse(fs.readFileSync(path.join(__dirname,'grades.json')).toString())
    renameInnerJSONKey(gradesJSON, "booknames", "sections")
    renameInnerJSONKey(gradesJSON, "bookref", "reference")
    fs.writeFileSync(path.join(__dirname,'grades.json'),JSON.stringify(gradesJSON["editions"],null,'\t'))

}
test()

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