
var DictionarySite = {
    WebCaller: new WebCaller(),
    btnSearch: {},
    searchBox: {},
    Resource: {
        HandlerUrl: '?handler=Suggestion&word=',
        SuggestionsText: "Suggestions",
        SuggestionsSelector: ".suggestions",
        LoadingText:"Loading...",
        baseUrl: 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    },
    getMeaning: (searchedWord,resultSelector) => {
        let baseUrl = DictionarySite.Resource.baseUrl + searchedWord;
        let resultUi = document.querySelector(resultSelector);
        DomExtension.Notify(document.querySelector(".noticePanel"), DictionarySite.Resource.LoadingText); 
        DictionarySite.WebCaller.get(baseUrl, function (result) {
            if (result == undefined || result == null || result.title || !result||result.length<1) {
                DictionarySite.reactOnError(searchedWord);
            }
            if (result[0].word) {
                resultUi.innerHTML = "";
                DictionarySite.emptySuggestionList();
                let htmlmean = `<dis-means content="${result[0].word}" jsonentry='${JSON.stringify(result[0]).replaceAll("'", '`')}'></dis-means>`;
                resultUi.insertAdjacentHTML("beforeend", htmlmean);
                let cardItem = `<component-card data-title="${result[0].word}" data-description="${baseUrl}"></component-card>`;
                document.querySelector(".cards").insertAdjacentHTML("beforeend", cardItem);
            }
        }, function (e) {
            DictionarySite.reactOnError(searchedWord);
            resultUi.innerHTML = "";
            DictionarySite.emptySuggestionList();
        });
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
                DictionarySite.emptySuggestionList();
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
    },
    emptySuggestionList: () => {
        let suggestionsElem = document.querySelector(DictionarySite.Resource.SuggestionsSelector);
        suggestionsElem.innerHTML = "";
    }
}