
var DictionarySite = {
    WebCaller: new WebCaller(),
    btnSearch: {},
    searchBox: {},
    Resource: {
        HandlerUrl: '?handler=Suggestion&word=',
        SuggestionsText: "suggestions",
        SuggestionsSelector: ".suggestions",
        LoadingText:"Loading...",
        baseUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    },
    getMeaning: (searchedWord,resultSelector) => {
        let baseUrl = DictionarySite.Resource.baseUrl + searchedWord;
        let resultUi = document.querySelector(resultSelector);
        resultUi.innerHTML = "<h3><marquee>" + DictionarySite.Resource.LoadingText + "</marquee></h3>";
        DictionarySite.WebCaller.get(baseUrl, function (result) {
            if (result == undefined || result == null || result.title || !result||result.length<1) {
                DictionarySite.reactOnError(searchedWord);
            }
            if (result[0].word) {
                
                let list = document.createElement("dl");
                resultUi.innerHTML = "";
                DictionarySite.makeWordUi(list, result[0], resultUi);
                resultUi.append(list);
            }
        }, function (e) {
            DictionarySite.reactOnError(searchedWord);
            resultUi.innerHTML = "";
        });
    },
    makeWordUi: (listElem, resultingItem, resultUi) => {
        let h4 = document.createElement("h4");
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
                        let bgCssClass = useAltBg ? 'altBg' : 'txtBg';
                        deftext.classList.add(bgCssClass);
                    }
                    
                }
                listElem.append(dt);
                listElem.append(dd);
            }
            
        }
    },
    reactOnError: (word)=> {
        let webCaller = DictionarySite.WebCaller;
        webCaller.get(DictionarySite.Resource.HandlerUrl + word
            , function (result) {
                let h5 = document.createElement("h5"), suggestionsElem = document.querySelector(DictionarySite.Resource.SuggestionsSelector);
                let ul = document.createElement("ul");
                h5.innerText = DictionarySite.Resource.SuggestionsText;
                suggestionsElem.innerHTML = "";
                suggestionsElem.append(h5);
                DictionarySite.createSuggestionList(ul,result);
                suggestionsElem.append(ul);
            },
            function (data) {
                alert(data);
                let suggestionsElem = document.querySelector(DictionarySite.Resource.SuggestionsSelector);
                suggestionsElem.innerHTML = "";
            }
        );
    },
    createSuggestionList: (listElem,words)=>{
        for (let i = 0; i < words.length; i++) {
            let item = document.createElement("li");
            let clickItem = document.createElement("a");
            clickItem.innerText = words[i];
            clickItem.addEventListener('click', function (elem) {
                if (DictionarySite.btnSearch && DictionarySite.searchBox) {
                    DictionarySite.searchBox.value = elem.target.text;
                    DictionarySite.btnSearch.click();
                }
            });
            clickItem.classList.add("lavender-btn");
            clickItem.classList.add("btn");
            item.append(clickItem);
            listElem.append(item);
        }
    }
}