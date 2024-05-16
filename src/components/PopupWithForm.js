import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    // TODO ask what this does and write it down
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

  submit(e) { // handles all submitting stuff
    e.preventDefault();
    const buttonLabel = this._popupElement.querySelector(".modal__save").innerText;
    this._popupElement.querySelector(".modal__save").innerText = "Saving....";
    this._handleFormSubmit(this._getInputValues());
    this._popupElement.querySelector(".modal__save").innerText = buttonLabel;

  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", this.submit);
    super.setEventListeners();
  }
}

export default PopupWithForm;
