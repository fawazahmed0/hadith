
const fs = require('fs/promises')
const path = require('path')
async function begin(){

    let info = await fs.readFile(path.join(__dirname, 'info.json'),{encoding:'utf8'})
    info = JSON.parse(info)

   

    let sections = {}

    for(let bareEdition of Object.keys(info)){

        sections[bareEdition] = {}
      
  
        let arr = []
 
        for(let hadith of info[bareEdition].hadiths){

            let bookno = hadith.reference.book
            if(!arr[bookno])
            arr[bookno] = []

            arr[bookno].push({"hadithnumber":hadith.hadithnumber, "arabicnumber":hadith.arabicnumber})
            
        }



  

       for(let i=0;i<arr.length;i++){
        
        if(!arr[i] || arr[i].length==0)
        continue

        let hadithnumberArr = arr[i].map(e=>e.hadithnumber)
        let arabicnumberArr = arr[i].map(e=>e.arabicnumber)
       

        sections[bareEdition][i] = {hadithnumber_first:Math.min(...hadithnumberArr),
             hadithnumber_last:Math.max(...hadithnumberArr),
             arabicnumber_first:Math.min(...arabicnumberArr),
             arabicnumber_last:Math.max(...arabicnumberArr),
            }



       }

 
    

    }

    for(let bareEdition of Object.keys(info)){

        info[bareEdition].metadata.section_details = sections[bareEdition]

    }

    console.log(sections)

    await fs.writeFile(path.join(__dirname, 'info.json'), JSON.stringify(info,null,'\t'))

}

begin()