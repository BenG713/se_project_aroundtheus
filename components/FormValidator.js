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

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => {return !inputEl.validity.valid})
  }

  _checkInputvalidity(inputEl) { //don't need for loop bc it's looping through inputs in _setEventListeners
    this._foundInvalid = false; 
      if (!inputEl.validity.valid) {
        this._foundInvalid = true;
      }
      if (this._foundInvalid) {
        this._showInputError(inputEl);
      } else {
        this._hideInputError(inputEl);
      }
    // don't need to return foundInvalid bc it's defined on first line of function as "global" within class
  }

  _toggleButtonState() {
    // const foundInvalid = this._checkInputvalidity();
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._formOptions.inactiveButtonClass);
      this._submitButton.disabled = true;
    } else {
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
