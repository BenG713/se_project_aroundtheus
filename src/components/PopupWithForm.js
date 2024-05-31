import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
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

  setButtonLoadingState(isLoading) { // handles all submitting stuff
    const buttonLabel = this._popupElement.querySelector(".modal__save");
    if(isLoading){
      buttonLabel.textContent = "Saving..."
    } else {
      buttonLabel.textContent = "Save"
    }
  }


  setEventListeners() {
    this._popupElement.addEventListener("submit", ()=>{
      this._handleFormSubmit(this._getInputValues())
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
