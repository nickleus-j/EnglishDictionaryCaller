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
    connectedCallback() {
        this.innerHTML = `<p>${this.getAttribute("content")}</p><hr/>`;
    }
}

Definition.prototype.ChangeContent = function(txt){
		this.TextContent = txt;
		// Render HTML
		this.innerHTML =
			`<p>
					${txt}
				</p>
			<hr/>`;
}
customElements.define("dis-means", Definition);