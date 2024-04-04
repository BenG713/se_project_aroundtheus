export default class FormValidator {
  constructor(formSelector, options) {
    this._formEl = document.querySelector(formSelector);
    this._formOptions = options;
  }

  _showInputError(inputEl) {
    inputEl.classList.add(this._formOptions.inputErrorClass);
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._formOptions.errorClass);
  }
  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._formOptions.inputErrorClass);
    errorMessageEl.classList.remove(this._formOptions.errorClass);
  }

  _checkInputValidity(inputEl) {
    //don't need for loop bc it's looping through inputs in _setEventListeners
    const isInputValid = inputEl.validity.valid;
    if (isInputValid) {
      this._hideInputError(inputEl);
    } else {
      this._showInputError(inputEl);
    }
  }

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._formOptions;
    this._inputEls = [...this._formEl.querySelectorAll(inputSelector)];
    this._submitButton = this._formEl.querySelector(submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._formOptions.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
      this._submitButton.classList.remove(
        this._formOptions.inactiveButtonClass
      );
      this._submitButton.disabled = false;
    }
  }

  toggleErrors() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl, this._formOptions);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  resetValidation(form) {
    form.reset();
    this._toggleButtonState();
  }
}
