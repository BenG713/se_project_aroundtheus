export default class FormValidator {
  constructor(formSelector, options) {
    this._formEl = document.querySelector(formSelector);
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

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._formOptions;
    this._inputEls = [...this._formEl.querySelectorAll(inputSelector)];
    this._submitButton = this._formEl.querySelector(submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputvalidity(this._formEl, this._formOptions, inputEl);
        this._toggleButtonState(
          this._inputEls,
          this._submitButton,
          this._formOptions
        );
      });
    });
  }


 

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    let foundInvalid = false;
    this._inputEls.forEach((inputEl) => {
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

  // _checkFormValidity() {
  //   this._inputEls.every(input => input.validity.valid)
  // };

  // _toggleButtonState () {
  //   const isFormValid = this._checkFormValidity
  // };
 




  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl, this._formOptions);
    });
    this._toggleButtonState(
      this._inputEls,
      this._submitButton,
      this._formOptions
    );
  }
}
