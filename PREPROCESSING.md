I first scrapped the grades from al-maktaba.org (did an arabic keyword google search in web & site specific to get the links), then I scraped content with english /arabic text mapped.

for example for urdu, I scrapped urdu & arabic, similarly did for other languagges

I then indexed english & arabic into elastic search. (this is for those, which doesn't follow correct numbering, we need to bring it to standard numbering, so that we can attach the correct grades)

Then performed the search to get the correct referece number, this reference number will be used to map the grades, because grades are mapped to arabic reference numbeing (same one at sunnah.com)

For languages which didn't have either arabic or english text such as turkish, I converted it into docx & translated the dcoument using google translate and then used the english version of it for searchinh using elastic serahc and getting the correct reference number, so that correct grade can be attached.


I used single scripts for doing text cleaning etc i.e in batch, to save time, also removed few hadiths, which had issues or multiple repeated refernce numbers

please refer the scripts in this repo and [hadith-api repo](https://github.com/fawazahmed0/hadith-api)
