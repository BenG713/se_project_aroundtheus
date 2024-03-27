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

  _getInputValues() {
    const formValues = {}
    const formInputs = Array.from(document.querySelectorAll(".modal__input"));
    formInputs.forEach((input) =>{
      formValues[input.name] = input.value
    })
    return formValues
  }



  setEventListeners() {
    super._setEventListeners()
    this._popupForm.addEventListener("submit", ()=>{
      this.handleFormSubmit(_getInputValues)
    })
  }
}



export default PopupWithForm;
