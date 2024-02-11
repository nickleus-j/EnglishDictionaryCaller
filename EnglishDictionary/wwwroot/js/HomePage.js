window.addEventListener("load", (event) => {

    let btnSearch = document.querySelector("#searchBtn");
    let searchBox = document.querySelector("#wordBox");
    let speakBtn = document.querySelector(".speak-btn");
    DictionarySite.btnSearch = btnSearch;
    DictionarySite.searchBox = searchBox;
    btnSearch.addEventListener('click', function () {
        if (!searchBox.value) {
            searchBox.value = "blank";
        }
        DictionarySite.getMeaning(searchBox.value, "article");
    });
    searchBox.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            btnSearch.click();
        }
    });
    speakBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (!searchBox.value) {
            searchBox.value = "blank";
        }

        if ('speechSynthesis' in window) {
            var msg = new SpeechSynthesisUtterance();
            msg.text = searchBox.value;
            window.speechSynthesis.speak(msg);
        } else {
            // Speech Synthesis Not Supported 😣
            document.querySelector("p.subtitle")("Sorry, your browser doesn't support text to speech :(");
        }

    });
});