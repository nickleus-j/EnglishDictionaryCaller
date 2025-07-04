﻿class Definition extends HTMLElement {
    constructor() {

        // Always call super first in constructor
        super();

        // Render HTML
        this.innerHTML =
            `<p>
				*****
			</p>
		<hr/>`;

    }
    changePlainly() {
        this.innerHTML = `<p>${this.getAttribute("content")}</p><hr/>`;
    }
    parseJsonEntry(toParse) {
        let entry = JSON.parse(toParse);
        let list = document.createElement("dl");
        this.innerHTML = "";
        this.makeWordUi(list, entry, this);
    }
    makeWordUi(listElem, resultingItem, resultUi) {
        let h4 = document.createElement("h4"), phonetics = document.createElement("span");
        h4.innerText = resultingItem.word;
        phonetics.innerText = resultingItem.phonetic;
        resultUi.append(h4);
        resultUi.append(phonetics);

        this.writeMeanings(resultingItem.meanings, listElem);
        resultUi.append(listElem);
    }
    writeMeanings(meanings, listElem) {
        if (meanings) {

            for (let i = 0; i < meanings.length; i++) {
                let dt = document.createElement("dt"), dd = document.createElement("dd");
                let currentMeaning = meanings[i];

                let strong = document.createElement("b");//meanings
                strong.innerText = "[" + (i + 1) + "] Part Of Speech: " + currentMeaning.partOfSpeech;
                dt.append(strong);

                if (currentMeaning.definitions) {
                    for (let j = 0; j < currentMeaning.definitions.length; j++) {
                        let currentDef = currentMeaning.definitions[j];
                        let deftext = document.createElement("p");//meanings
                        deftext.innerText = (j + 1) + ": " + currentDef.definition;
                        let useAltBg = j % 2 > 0;
                        let bgCssClass = useAltBg ? 'altBg' : 'txtBg';
                        deftext.classList.add(bgCssClass);
                        dd.append(deftext);
                        if (currentDef.example) {
                            let sentence = document.createElement("pre");
                            sentence.innerText = currentDef.example;
                            dd.append(sentence);
                        }
                    }

                }
                listElem.append(dt);
                listElem.append(dd);

            }

        }
    }
    connectedCallback() {
        if (this.getAttribute("jsonentry")) {
            this.parseJsonEntry(this.getAttribute("jsonentry").replaceAll("'", '`'));
        }
        else {
            this.changePlainly();
        }
    }
}

Definition.prototype.ChangeContent = function (txt) {
    this.TextContent = txt;
    // Render HTML
    this.changePlainly();
}
customElements.define("dis-means", Definition);