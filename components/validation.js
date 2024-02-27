export default class FormValidator {
  constructor(formSelector, options) {
    this._formEl = document.querySelector(formSelector)
    this._formOptions = options;
  } 

  _showInputError(inputEl, { inputErrorClass, errorClass }) {
    inputEl.classList.add(inputErrorClass);
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}
  _hideInputError(inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.classList.remove(errorClass);
}

  _checkInputvalidity(formEl, options, inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, options);
    } else {
      this._hideInputError(inputEl, options);
    }
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;
    inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
    });
    if (foundInvalid) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    } else {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
  }
  
  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._formOptions;
    const inputEls = [...this._formEl.querySelectorAll(inputSelector)];
    const submitButton = this._formEl.querySelector(submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputvalidity(this._formEl, this._formOptions, inputEl);
        this._toggleButtonState(inputEls, submitButton, this._formOptions);
      });
    });
  }

  enableValidation() {
      this._formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });
      this._setEventListeners();
  }

}


const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// inputEls is input selector
//formEls is form selector

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

