class Popup {
  constructor({ popupSelector, openSelector = "", preOpenHandler = () => {} }) {
    this._popupElement = document.querySelector(popupSelector);
    
    if (openSelector !== "") {
      this._preOpenHandler = preOpenHandler; //profile input values (placeholders in modal)
      this._openElement = document.querySelector(openSelector); //edit or add button or image
      this._openElement.addEventListener("click", () => {
        this._preOpenHandler();
        this.open();
      });
    }
  }
 
  open() {
    this._closeBtn = this._popupElement.querySelector(".modal__close");
    document.addEventListener("keydown", this._handleEscClose);
    this._popupElement.classList.add("modal_opened");
    this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("modal_opened");

    this._popupElement.removeEventListener("click", this.handleClickOutside);

    this._closeBtn.removeEventListener("click", this._handleCloseBtn);

  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleCloseBtn = () => {
    this.close();
  }

  handleClickOutside(event) {
    if (Array.from(event.target.classList).includes("modal_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (event) => {
      this.handleClickOutside(event);
    });
    this._closeBtn.addEventListener("click", this._handleCloseBtn);
  };
  
}

export default Popup;


