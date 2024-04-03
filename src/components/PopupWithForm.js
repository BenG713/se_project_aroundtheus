import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    openSelector = "",
    preOpenHandler = () => {}
  ) {
    super({ popupSelector, openSelector, preOpenHandler });
    this._popupModal = this._popupElement;
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const formValues = {};
    const formInputs = Array.from(document.querySelectorAll(".modal__input"));
    formInputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    this._popupModal.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
