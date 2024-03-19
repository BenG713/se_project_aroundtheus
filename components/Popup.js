class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  handleClickOutside(event) {
      if (Array.from(event.target.classList).includes("modal_opened")) {
        this.close();
      }
    
  }

  open() {
    this._popupElement.classList.add("modal_opened"); // Opens modal
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.addEventListener("click", (event) => {
      this.handleClickOutside(event);
      this._handleEscClose;
    }
    );
  }

  close() {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) {
      modalOpened.classList.remove("modal_opened");
    }
    document.removeEventListener("keydown", () => {
      this.handleClickOutside();
      this._handleEscClose;
    }
    );
  }

  _handleEscClose(evt) {
    console.log(1)
    if (evt.key === "Escape") {
      this.close();
      console.log(2);
    }
  }

  setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
  }
}

export default Popup;
