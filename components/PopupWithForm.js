import Popup from "./PopUp.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    // this._popupForm.reset();
    super.open(this._popupForm);
  }

  close() {
    this._popupForm.querySelector(".modal__form").reset();
    super.close();
    super._handleEscClose();
  }
}
export default PopupWithForm;
