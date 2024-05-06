export default class Card {
  constructor(
    { name, link, id },
    cardSelector,
    handleImageClick,
    handleDeleteConfirm
  ) {
    this.handleDeleteConfirm = handleDeleteConfirm;
    this.name = name;
    this.link = link;
    this.id = id;
    this._cardSelector = cardSelector; //card template
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this.handleDeleteButton(this.handleDeleteConfirm);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick(this);
      });
  }

  _setCardNameImageAndDescription() {
    const cardImageEl = this._cardElement.querySelector(".card__image"); //adds card image div
    const cardNameTextEl = this._cardElement.querySelector(
      ".card__description-text"
    );

    cardImageEl.src = this.link; //adds card image
    cardImageEl.alt = this.name; //adds card alt text
    cardNameTextEl.textContent = this.name; //Description
  }

  _handleLikeButton() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }
  
  handleDeleteButton() {
    this.handleDeleteConfirm(this);
  }

  getCardElement() {
    this._cardElement = document
      .querySelector(this._cardSelector) //outer container for card list item (template)
      .content.querySelector(".card") //list item element which contains all parts of the card
      .cloneNode(true);

    this._setEventListeners(); //setting event listeners for like button, delete button.
    this._setCardNameImageAndDescription(); //getting the image div, image, description, and setting them.

    return this._cardElement;
  }
}
