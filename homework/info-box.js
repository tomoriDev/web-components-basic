class InfoBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #info-box {
          display: none;
          background-color: lightgray;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          max-width: 300px;
        }
      </style>

      <button>Show info</button>

      <p id="info-box">
        <slot></slot>
      </p>
    `;
    this._isVisible = false;
    this._toggleButton = this.shadowRoot.querySelector("button");
    this._infoBox = this.shadowRoot.querySelector("p");
  }

  connectedCallback() {
    const button = this.shadowRoot.querySelector("button");
    button.addEventListener("click", this._toggleInfo.bind(this));
  }

  _toggleInfo() {
    this._isVisible = !this._isVisible;
    this._toggleButton.textContent = this._isVisible ? "Hide" : "Show";
    this._infoBox.style.display = this._isVisible ? "block" : "none";
  }
}

customElements.define("uc-info-box", InfoBox);
