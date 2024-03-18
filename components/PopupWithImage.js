import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._cardImage = this._popupElement.querySelector(".modal__preview-image");
    this._cardTitle = this._popupElement.querySelector(".modal__preview-title");
  }

  open(name, link) {
    super.open();
    this._cardImage.src = link;
    this._cardTitle.textContent = name;
    this._cardImage.alt = name;
    console.log(this._cardImage);
    console.log(this._cardTitle);
  }
}
