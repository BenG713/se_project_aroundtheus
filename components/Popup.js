export class Popup {
  constructor( { popupSelector } ) {
    this._popUpElement = document.querySelector(popupSelector);
    console.log(this._popUpElement);
  }

  close() {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) {
      modalOpened.classList.remove("modal_opened");
    }
    document.removeEventListener("keydown", this._handleEscClose);
  }

  open() {
    this._popUpElement.classList.add("modal_opened"); // Opens modal
    document.addEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });
  }
}

export default Popup;
