const path = require('path')
const fs = require('fs/promises')
const fg = require('fast-glob');

async function test() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    let files = await fg([path.posix.join('.', 'jsonnew', '**')], { dot: true });


    for (let jsonfile of files) {

        console.log(jsonfile)

        let data = await fs.readFile(jsonfile, { encoding: 'utf8' })
        data = JSON.parse(data)

        let lasthadithno = 1


        for (let i = 0; i < data.length; i++) {

            let bareEdition = jsonfile.split(path.posix.sep).at(-1).replace(/\.json$/gi, '')
            let indexname = `${bareEdition}arabic`
            let jsonval = {
                "query": {
                    "match": {
                        "column2": data[i]["hadithArabic"].normalize("NFD").replace(/\p{Diacritic}|\p{Mark}|\p{Extender}|\p{Bidi_Control}/gu, "")
                    }
                }
            }
            var requestOptions = {
                method: "POST",
                headers: {
                    "Authorization": "Basic ZWxhc3RpYzpXekswNXRTVVh4UzZibUlZRHhzOQ==",
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(jsonval)
            }
            let res = await fetch("https://192.168.1.192:9200/" + indexname + "/_search", requestOptions)
            let resdata = await res.json()


            let columns = resdata.hits.hits.filter(e => e._score > 20 && Math.abs(lasthadithno-e._source.column1) <10).slice(0, 3).map(e => e._source.column1)

            if (lasthadithno != 1)
                columns = columns.filter(e => e != lasthadithno)

            if (columns.length == 0)
                continue


            data[i]["newhadithno"] = columns.reduce((prev, curr) => Math.abs(curr - lasthadithno) < Math.abs(prev - lasthadithno) ? curr : prev);

            console.log(data[i]["newhadithno"]);


            lasthadithno = data[i]["newhadithno"]

        }

        await fs.writeFile(jsonfile, JSON.stringify(data, null, 4))


    }


}

test()