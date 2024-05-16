class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeBtn = this._popupElement.querySelector(".modal__close");
  }
 
  open() {
    this._popupElement.classList.add("modal_opened"); 
    document.addEventListener("keydown", this._handleEscClose); 
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);

  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleCloseBtn = () => {
    this.close();
  }

  handleClickOutside = (event) => {
    if (Array.from(event.target.classList).includes("modal_opened")) {
      this.close();
    }
  }



  setEventListeners() {
    this._popupElement.addEventListener("click", this.handleClickOutside);
    this._closeBtn.addEventListener("click", this._handleCloseBtn);
  };

}

export default Popup;


