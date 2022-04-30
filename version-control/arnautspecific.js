

const fs = require('fs');
const path = require('path');


async function test(){

    let contentPath =  path.join(__dirname,'hadithfiles','33036content.txt')
    let gradingPath =  path.join(__dirname,'hadithfiles','33036gradings.txt')
  

   

        let content = fs.readFileSync(contentPath).toString()
        let contentArr = content.split(/\r?\n/)

        let grading = fs.readFileSync(gradingPath).toString()
        let gradingArr = grading.split(/\r?\n/)

        let gradesArr = []
        for(let j=0;j<gradingArr.length;j++){
            let index = gradingArr[j].match(/\d+/)[0]
            gradesArr[index] = gradingArr[j] 
        }

        for(let i = 0; i < contentArr.length; i++){
            let no = contentArr[i].match(/\d+/)[0]
            let gradeRef = contentArr[i].match(/\|\d+\|/g) || []
            let gradestr = '' + no + ' | '
            for(let grades of gradeRef){
              let index = grades.slice(1,-1)
              gradestr+=gradesArr[index]
            }
            contentArr[i] = gradestr.replace(/\r?\n/g,' ')
        }
        
        fs.writeFileSync(contentPath,contentArr.join('\n').trim())
    
       

}
test()