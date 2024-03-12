export class Popup {
  constructor( { popUpSelector } ) {
    this._popUpElement = document.querySelector(popUpSelector);
    
    ;
  }

  _close() {
    const modalOpened = document.querySelector(".modal_opened");
    if (modalOpened) {
      modalOpened.classList.remove("modal_opened");
    }
    document.removeEventListener("keydown", handleEscape);
  }

  _open(modal) {
    modal.classList.add("modal_opened"); // Opens modal
    document.addEventListener("keydown", handleEscape);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      closePopUp();
    }
  };

  setEventListeners() {
    this._cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", () => {
      this._handleLikeButton();
    });}

}
