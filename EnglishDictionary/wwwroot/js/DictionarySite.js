
var DictionarySite = {
    WebCaller: new WebCaller(),
    getMeaning: (searchedWord,resultSelector) => {
        let baseUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchedWord;
        DictionarySite.WebCaller.get(baseUrl, function (result) {
            if (result == undefined || result == null || result.title || !result[0]) {
                DictionarySite.reactOnError(searchedWord);
            }
            if (result[0].word) {
                let resultUi = document.querySelector(resultSelector);
                let list = document.createElement("dl");
                resultUi.innerHTML = "";
                DictionarySite.makeWordUi(list, result[0], resultUi);
                resultUi.append(list);
            }
        }, function (e) {
            //DomExtension.ShowModal("Error in contacting Server", "Try again later " + e);
        });
    },
    makeWordUi: (listElem, resultingItem, resultUi) => {
        let dt = document.createElement("dt"), h4 = document.createElement("h4"), dd= document.createElement("dd");
        h4.innerText = resultingItem.word;
        resultUi.append(h4);

        DictionarySite.writeMeanings(resultingItem.meanings, listElem);
        
    },
    writeMeanings: (meanings, listElem) => {
        if (meanings) {
            
            for (let i = 0; i < meanings.length; i++) {
                let dt = document.createElement("dt"), dd = document.createElement("dd");
                let currentMeaning = meanings[i];
                
                let strong = document.createElement("b");//meanings
                strong.innerText = "["+(i + 1) + "] Part Of Speech: " + currentMeaning.partOfSpeech;
                dt.append(strong);
                
                if (currentMeaning.definitions) {
                    for (let j = 0; j < currentMeaning.definitions.length; j++) {
                        let currentDef = currentMeaning.definitions[j];
                        let deftext = document.createElement("p");//meanings
                        deftext.innerText = (j + 1) + ": " + currentDef.definition;
                        dd.append(deftext);
                        let useAltBg = j % 2 > 0;
                        if (useAltBg) {
                            deftext.classList.add('altBg');
                        }
                        else {
                            deftext.classList.add('txtBg');
                        }
                    }
                    
                }
                listElem.append(dt);
                listElem.append(dd);
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