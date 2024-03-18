import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";


const newCardPopup = new PopupWithForm("#profile-card-modal", () => {}); //submission handler in brackets
const profileForm = new PopupWithForm("#profile-edit-modal", () => {});
const imagePopup = new PopupWithImage( { popupSelector: "#modal-image" }, handleImageClick);


const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// inputEls is input selector
//formEls is form selector

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);

profileFormValidate.enableValidation();
profileFormValidate.resetValidation();
cardFormValidate.enableValidation();

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

const imageModalContent = document.querySelector("#modal-image");
const modalImage = imageModalContent.querySelector(".modal__preview-image");
const modalTitle = imageModalContent.querySelector(".modal__preview-title");

//inputs and information

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileNameInput = document.querySelector("#profile-name-input"); // in modal form
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
); // in modal form

const cardNameInput = document.querySelector("#card-name-input"); //in modal form
const cardImageInput = document.querySelector("#card-image-link-input"); // in modal form

const cardName = document.querySelector(".card__description-text"); //in card template
const cardImage = document.querySelector(".card__image"); //in card template

const profileEditForm = document.forms["profile-form"]; //Where you type stuff in
const cardEditForm = document.forms["card-form"];


function handleImageClick(data) {
  modalImage.src = data._link;
  modalImage.alt = data._name;
  modalTitle.textContent = data._name;
  imagePopup.open();
}

// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     closePopUp();
//   }
// }

// function closePopUp() {
//   const modalOpened = document.querySelector(".modal_opened");
//   if (modalOpened) {
//     modalOpened.classList.remove("modal_opened");
//   }
//   document.removeEventListener("keydown", handleEscape);
// }

// const allModals = document.querySelectorAll(".modal");

// allModals.forEach((el) => {
//   el.addEventListener("click", (event) => {
//     if (event.target.classList.contains("modal_opened")) {
//       closePopUp();
//     }
//   });
// });

// function openPopup(modal) {
//   modal.classList.add("modal_opened"); // Opens modal
//   document.addEventListener("keydown", handleEscape);
// }

function handleProfileTextContent(e) { //EDITS PROFILE TITLE/SUBTITLE
  e.preventDefault(); //stops page from refreshing
  profileName.textContent = profileNameInput.value; //Profile name = what was entered in modal
  profileDescription.textContent = profileDescriptionInput.value;
  profileFormValidate.resetValidation();
  profileForm.close();
}

function handleProfileInputValues() { //SETS PLACEHOLDERS IN MODAL FORM
  profileFormValidate.resetValidation();
  profileNameInput.value = profileName.textContent; //Placeholder = Current profile name
  profileDescriptionInput.value = profileDescription.textContent; //Placeholder = Current description
}

// When you click the add card button (the +), it creates a new card.
function handleCardContent(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardImageInput.value;
  const returnedElement = createCard(name, link);
  cardListEl.prepend(returnedElement);
  cardFormValidate.resetValidation();
  newCardPopup.close();
}

function createCard(name, link) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  return card.getCardElement();
}

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list"); // .cards__list is ul element

// Event listeners
profileEditBtn.addEventListener("click", ()=> {
  handleProfileInputValues();
  profileForm.open();
}
);

profileCloseBtn.addEventListener("click", () => {
  profileForm.close();
});

profileEditForm.addEventListener("submit", handleProfileTextContent);

cardEditBtn.addEventListener("click", () => {
  newCardPopup.open();
});

cardCloseBtn.addEventListener("click", () => {
  newCardPopup.close();
});

cardEditForm.addEventListener("submit", handleCardContent);

imageCloseBtn.addEventListener("click", () => {
  imagePopup.close();
});

//When page is opened, this displays all cards you've created.
initialCards.forEach((cardData) => {
  const returnedElement = createCard(cardData.name, cardData.link);
  cardListEl.prepend(returnedElement);
});
