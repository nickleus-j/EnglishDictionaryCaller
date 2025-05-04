
var DomExtension = {
    MakeElement: function (tagName, text) {
        let elem = document.createElement(tagName);
        elem.append(text);
        return elem;
    },
    ShowModal: function (Title, Text) {
        let modalElem = document.querySelector(".main-modal");
        modalElem.classList.add("d-block");
        modalElem.querySelector(".modal-title").innerHTML = Title;
        modalElem.querySelector(".modal-body p").innerHTML = Text;
        setTimeout(() => {
            document.querySelector(".main-modal").classList.remove("d-block");
        }, 5000)
    },
    Notify: function (containerElem, message) {
        let notifElem = document.createElement("div"), p = this.MakeElement("p", message);
        let barElem = document.createElement("div");
        barElem.classList.add("progress-bar");
        notifElem.classList.add("notification");
        notifElem.append(p);
        notifElem.append(barElem);
        containerElem.innerHTML = "";
        containerElem.prepend(notifElem);
        this.ShrinkProgressBar(barElem);
        setTimeout(() => {
            notifElem.classList.add("hidden");
        }, 5000);
    },
    ShrinkProgressBar: (progressBarElem) => {
        let i = 1;
        var width = 100;
        var id = setInterval(frame, 5);
        function frame() {
            if (width < 0) {
                clearInterval(id);
                i = 0;
            } else {
                width--;
                progressBarElem.style.width = width + "%";
            }
        }
    }
}
