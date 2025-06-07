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
        pingViaAudio();
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
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

function pingViaAudio() {
    var oscillator = audioContext.createOscillator();
    var gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine'; // Or 'triangle', 'square', 'sawtooth'
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime); // Frequency in Hz

    // Create a quick decay for a "ping" effect
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Initial volume
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3); // Decay over 0.3 seconds

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3); // Stop after the decay
}