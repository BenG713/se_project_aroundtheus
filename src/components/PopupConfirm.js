import Popup from "./Popup";

export class PopupConfirm extends Popup {
  submitAction(action) {
    this.handleSubmitAction = action; //handleSubmitAction is the function (api.delete card)
  }

  setEventListeners() {
    this._popupElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmitAction();
    });
  }
}
