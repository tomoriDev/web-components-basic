class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = "Some dummy tooltip text";
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }

    const tooltipIcon = document.createElement("span");
    tooltipIcon.textContent = " ❓";
    tooltipIcon.addEventListener("mouseenter", this._showTooltip.bind(this));
    tooltipIcon.addEventListener("mouseleave", this._hideTooltip.bind(this));
    this.appendChild(tooltipIcon);
    this.style.position = "relative";
    this.style.cursor = "pointer";
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement("div");
    this._tooltipContainer.textContent = this._tooltipText;
    this._tooltipContainer.style.backgroundColor = "black";
    this._tooltipContainer.style.color = "white";
    this._tooltipContainer.style.position = "absolute";
    this._tooltipContainer.style.top = "100%";
    this._tooltipContainer.style.left = "0";
    this._tooltipContainer.style.zIndex = "1000";
    this._tooltipContainer.style.padding = "5px";
    this._tooltipContainer.style.marginTop = "4px";
    this._tooltipContainer.style.transition = "opacity 0.2s ease-in-out";
    this._tooltipContainer.style.pointerEvents = "none"; // Prevents tooltip from blocking mouse events
    this._tooltipContainer.classList.add("tooltip-container");

    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer);
  }
}

customElements.define("uc-tooltip", Tooltip);
