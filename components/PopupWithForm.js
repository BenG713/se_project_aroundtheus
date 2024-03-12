import Popup from "./PopUp";

class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super( { popupSelector } );
        this._popUpForm = this._popUpElement.querySelector(".modal__form")
        this._handleFormSubmit = handleFormSubmit;
    }

    close() {
        this._popUpForm.reset();
        super.close();
    }


}