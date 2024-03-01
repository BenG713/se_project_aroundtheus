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

  _setEventListeners() {
    const { inputSelector, submitButtonSelector } = this._formOptions;
    this._inputEls = [...this._formEl.querySelectorAll(inputSelector)];
    this._submitButton = this._formEl.querySelector(submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (evt) => {
        this._checkInputvalidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  _checkInputvalidity(inputEl) {
    let foundInvalid = false;
    this._inputEls.forEach((inputEl) => {
      if (!inputEl.validity.valid) {
        foundInvalid = true;
      }
      if (foundInvalid) {
        this._showInputError(inputEl);
      } else {
        this._hideInputError(inputEl);
      }
    });
    return foundInvalid;

  }

  _toggleButtonState() {
    // this._checkInputvalidity();
    if (this.foundInvalid) {
      console.log("invalid");
      // this._submitButton.classList.add(this._formOptions.inactiveButtonClass);
      // this._submitButton.disabled = true;
    } else {
      console.log("valid");
      this._submitButton.classList.remove(this._formOptions.inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

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
