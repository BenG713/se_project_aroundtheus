const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Buttons
const profileEditBtn = document.querySelector("#profile-edit-button");
const cardEditBtn = document.querySelector("#profile-add-button");
const profileCloseBtn = document.querySelector("#close-button");
const cardCloseBtn = document.querySelector("#card-close-button");
const imageCloseBtn = document.querySelector("#image-close-button");

//Modals
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardEditModal = document.querySelector("#profile-card-modal");


//inputs

const profileNameInput = document.querySelector("#profile-name-input"); // in modal form
const profileDescriptionInput = document.querySelector("#profile-description-input"); // in modal form

const cardNameInput = document.querySelector("#card-name-input"); //in modal form
const cardImageInput = document.querySelector("#card-image-link-input"); // in modal form

const cardName = document.querySelector(".card__description-text"); //in card template
const cardImage = document.querySelector(".card__image"); //in card template

const profileEditForm = profileEditModal.querySelector("#profile-form"); //Where you type stuff in
const cardEditForm = cardEditModal.querySelector("#card-form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list"); // .cards__list is ul element

// Event listeners
profileEditBtn.addEventListener("click", handleProfileInputValues);

profileCloseBtn.addEventListener("click", () => {
  closePopUp(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileTextContent);

cardEditBtn.addEventListener("click", () => {
  openPopup(cardEditModal);
});

cardCloseBtn.addEventListener("click", () => {
  closePopUp(cardEditModal);
});

cardEditForm.addEventListener("submit", handleCardContent);

imageCloseBtn.addEventListener("click", () => {
  closePopUp(imageModal)}
);

initialCards.forEach((cardData) => {
  const cardElement = renderCard(cardData.name, cardData.link);
  cardListEl.prepend(cardElement);
});
