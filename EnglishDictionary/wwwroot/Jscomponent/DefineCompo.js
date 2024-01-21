class Definition extends HTMLElement {
    constructor() {

        // Always call super first in constructor
        super();

        // Render HTML
        this.innerHTML =
            `<p>
				****
			</p>
		<hr/>`;

    }
    changePlainly() {
        this.innerHTML = `<p>${this.getAttribute("content")}</p><hr/>`;
    }
    parseJsonEntry(toParse) {
        let entry = JSON.parse(toParse), htmlToGive = ``;
        let meanings = entry.meanings;
        let list = document.createElement("ul");
        htmlToGive = htmlToGive.concat(`<h4>${entry.word}</h4>`);
        if (meanings) {

            for (let i = 0; i < meanings.length; i++) {
                let currentMeaning = meanings[i];
                if (currentMeaning.definitions) {
                    for (let j = 0; j < currentMeaning.definitions.length; j++) {
                        let currentDef = currentMeaning.definitions[j];
                        let item = document.createElement("li");
                        item.textContent = currentDef.definition;

                        let useAltBg = j % 2 > 0;
                        let bgCssClass = useAltBg ? 'altBg' : 'txtBg';
                        item.classList.add(bgCssClass);
                        list.append(item);
                    }
                }
            }
            htmlToGive = htmlToGive.concat(list.innerHTML);
        }
        this.innerHTML = htmlToGive;
    }
    makeWordUi(listElem, resultingItem, resultUi) {
        let h4 = document.createElement("h4");
        h4.innerText = resultingItem.word;
        resultUi.append(h4);

        DictionarySite.writeMeanings(resultingItem.meanings, listElem);

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
    this.innerHTML =
        `<p>
					${txt}
				</p>
			<hr/>`;
}
customElements.define("dis-means", Definition);