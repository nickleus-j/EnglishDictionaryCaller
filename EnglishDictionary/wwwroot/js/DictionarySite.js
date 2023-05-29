
var DictionarySite = {
    WebCaller: new WebCaller(),
    getMeaning: (searchedWord,resultSelector) => {
        let baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchedWord;
        DictionarySite.WebCaller.get(baseUrl,  function (result) {
            if (result == undefined || result == null || result.title || !result[0]) {
                DictionarySite.reactOnError(searchedWord);
            }
            if (result[0].word) {
                let resultUi = document.querySelector(resultSelector);
                let list = document.createElement("dl");
                resultUi.innerHTML = "";
                DictionarySite.makeWordUi(list, result[0]);
                resultUi.append(list);
            }
            


        }, function (e) {
            //DomExtension.ShowModal("Error in contacting Server", "Try again later " + e);
            
        });
    },
    makeWordUi: (listElem,resultingItem) => {
        let dt = document.createElement("dt"), h4 = document.createElement("h4"), dd= document.createElement("dd");
        h4.innerText = resultingItem.word;
        dt.append(h4);
        listElem.append(dt);
        DictionarySite.writeMeanings(resultingItem.meanings, dd);
        listElem.append(dd);
    },
    writeMeanings: (meanings,uiElem) => {
        if (meanings) {
            for (let i = 0; i < meanings.length; i++) {
                let currentMeaning = meanings[i];
                let h5 = document.createElement("h5");//meanings
                h5.innerText = "["+(i + 1) + "] Part Of Speech: " + currentMeaning.partOfSpeech;
                uiElem.append(h5);
                if (currentMeaning.definitions) {
                    let p = document.createElement("p");
                    for (let j = 0; j < currentMeaning.definitions.length; j++) {
                        let currentDef = currentMeaning.definitions[j];
                        let deftext = document.createElement("p");//meanings
                        deftext.innerText = (j + 1) + ": " + currentDef.definition;
                        p.append(deftext);
                    }
                    uiElem.append(p);
                }
                uiElem.append(document.createElement("hr"));
            }
            
        }
        
    },
    reactOnError: (word)=> {
        let webCaller = DictionarySite.WebCaller;
        webCaller.get('?handler=Suggestion&word=' + word
            , function (result) {
                let h5 = document.createElement("h5"), suggestionsElem = document.querySelector(".suggestions");
                let ul = document.createElement("ul");
                h5.innerText = "suggestions";
                suggestionsElem.innerHTML = "";
                suggestionsElem.append(h5);
                DictionarySite.createSuggestionList(ul,result);
                suggestionsElem.append(ul);
            },
            function (data) {
                alert(data);
                let suggestionsElem = document.querySelector(".suggestions");
                suggestionsElem.innerHTML = "";
            }
        );
    },
    createSuggestionList: (listElem,words)=>{
        for (let i = 0; i < words.length; i++) {
            let item = document.createElement("li");
            item.innerText = words[i];
            listElem.append(item);
        }
    }
}