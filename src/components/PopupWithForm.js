import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this.submit = this.submit.bind(this);
  }

  _getInputValues() {
    const formValues = {};
    const formInputs = Array.from(document.querySelectorAll(".modal__input"));
    formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  submit(e) {
    e.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", this.submit);
    super.setEventListeners();
  }
}

export default PopupWithForm;
