class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text";
    this.attachShadow({ mode: "open" });
    // const template = document.querySelector("#tooltip-template");
    // this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          z-index: 10;
          padding: 5px;
          border-radius: 4px;
          transition: opacity 0.2s ease-in-out;
          width: max-content;
        }
      </style>
      <slot> Some default </slot>
      <span> ❓</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = this.shadowRoot.querySelector("span");
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.shadowRoot.appendChild(tooltipIcon);
    this.style.position = "relative";
    this.style.cursor = "pointer";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
