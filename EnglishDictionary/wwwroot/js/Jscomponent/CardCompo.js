// Create a class for the element
class Card extends HTMLElement {
  constructor() {
    super();

    this.setAttribute("role", "article");
    this.classList.add("card");

    // Title
    const title = document.createElement("h2");
    title.classList.add("card__title");
    title.textContent = this.getAttribute("data-title");

    // Description
    const description = document.createElement("div");
    description.classList.add("card__description");
    description.innerHTML = this.getAttribute("data-description");

    // Image
    let imageWrapper;
    if (this.hasAttribute("data-image")) {
      const image = document.createElement("img");
      image.classList.add("card__image");
      image.src = this.getAttribute("data-image");
      if (this.hasAttribute("data-image-alt")) {
        image.alt = this.getAttribute("data-image-alt");
      }
      imageWrapper = document.createElement("div");
      imageWrapper.classList.add("card__image-wrapper");
      imageWrapper.appendChild(image);
      this.appendChild(imageWrapper);
    }

    // CTA
    let ctaContainer;
    if (this.hasAttribute('data-cta-href')) {
      const cta = document.createElement("a");
      cta.classList.add("card__link");
      cta.href = this.getAttribute("data-cta-href");
      cta.textContent = this.getAttribute("data-cta-text");
      ctaContainer = document.createElement("div");
      ctaContainer.classList.add('card__cta');
      ctaContainer.appendChild(cta);
    }

    const contentContainer = document.createElement("div");
    contentContainer.classList.add("card__content");
    contentContainer.appendChild(title);
    contentContainer.appendChild(description);
    if (ctaContainer&&ctaContainer !== 'undefined') {
      contentContainer.appendChild(ctaContainer);
    }

    // Create some CSS to apply to the shadow dom
    const style = document.createElement("style");
    style.textContent = `
      :host {
        display: inline-block;
        background: #eaeaea;
        border-radius: 10px;
        border: 1px solid black;
        max-width: 300px;
        color: #333;
      }
      
    `;

    // Attach the created elements to the shadow dom
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(style);
    if (imageWrapper !== undefined) {
      shadowRoot.appendChild(imageWrapper);
    }
    shadowRoot.appendChild(contentContainer);
  }
}

// Define the new element
customElements.define("component-card", Card);