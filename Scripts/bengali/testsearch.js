async function test(){
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    
    let indexname = "tirmidhiarabic"
    let jsonval = {
        "query": {

          "match": {
            // hadith no 782
            "column2": 
            `حَدَّثَنَا قُتَيْبَةُ، وَنَصْرُ بْنُ عَلِيٍّ، قَالاَ حَدَّثَنَا سُفْيَانُ بْنُ عُيَيْنَةَ، عَنْ أَبِي الزِّنَادِ، عَنِ الأَعْرَجِ، عَنْ أَبِي هُرَيْرَةَ، عَنِ النَّبِيِّ صلى الله عليه وسلم قَالَ ‏ "‏ لاَ تَصُومُ الْمَرْأَةُ وَزَوْجُهَا شَاهِدٌ يَوْمًا مِنْ غَيْرِ شَهْرِ رَمَضَانَ إِلاَّ بِإِذْنِهِ ‏"‏ ‏.‏ قَالَ وَفِي الْبَابِ عَنِ ابْنِ عَبَّاسٍ وَأَبِي سَعِيدٍ ‏.‏ قَالَ أَبُو عِيسَى حَدِيثُ أَبِي هُرَيْرَةَ حَدِيثٌ حَسَنٌ صَحِيحٌ ‏.‏ وَقَدْ رُوِيَ هَذَا الْحَدِيثُ عَنْ أَبِي الزِّنَادِ عَنْ مُوسَى بْنِ أَبِي عُثْمَانَ عَنْ أَبِيهِ عَنْ أَبِي هُرَيْرَةَ عَنِ النَّبِيِّ صلى الله عليه وسلم ‏`
            .normalize("NFD").replace(/\p{Diacritic}|\p{Mark}|\p{Extender}|\p{Bidi_Control}/gu, "")
          }
        }
      }
      var requestOptions = {
        method:"POST",
         headers: {
         "Content-Type": "application/json",
         "Accept": "application/json"
        },
         body:JSON.stringify(jsonval)
       }
    let res = await fetch("http://localhost:9200/"+indexname+"/_search", requestOptions)
    let data = await res.json()
    console.log(JSON.stringify(data,null,4))

}

test()