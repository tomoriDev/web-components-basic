class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", this._confirmNavigation.bind(this));
  }

  _confirmNavigation(event) {
    if (!confirm("Are you sure you want to navigate?")) {
      event.preventDefault();
    }
  }
}

customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
