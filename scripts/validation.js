function showInputError(formEl, inputEl, options) {
 const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
//  inputEl.classList.add(options.inputErrorClass)
//  errorMessageEl.textContent = inputEl.validationMessage;
//  errorMessageEl.classList.add(errorClass);

 console.log(errorMessageEl);
};

function checkInputvalidity(formEl, options, inputEl) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
    } else {
    hideInputError(formEl, inputEl, options);
   }
};

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...document.querySelectorAll(options.inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (evt) => {
      checkInputvalidity(formEl, options, inputEl);
    });
  });
};

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
