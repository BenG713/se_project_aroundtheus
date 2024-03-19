import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open(this._popupForm);
  }

  close() {
    super.close(this._popupForm);
  }
}
export default PopupWithForm;
