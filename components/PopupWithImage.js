import Popup from "./PopUp";

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._cardImage = this._popupElement.querySelector(".modal__preview-image");
    this._cardTitle = this._popupElement.querySelector(".modal__preview-title");
    console.log(this._cardImage);
    console.log(this._cardTitle);
  }

  open({ name, link }) {
    super.open();
    this._cardImage.src = link;
    this._cardTitle.textContent = name;
    this._cardImage.alt = name;
  }
}
