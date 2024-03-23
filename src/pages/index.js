import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../components/constants.js";

const newCardPopup = new PopupWithForm("#profile-card-modal", () => {}); //submission handler in brackets
const profileForm = new PopupWithForm("#profile-edit-modal", () => {});
const imagePopup = new PopupWithImage({ popupSelector: "#modal-image" });

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);

profileFormValidate.enableValidation();
profileFormValidate.resetValidation();
cardFormValidate.enableValidation();

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

const userInfo = new UserInfo({ profileName, profileDescription });

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
  imagePopup.open(data._name, data._link);
}

function handleProfileInputValues() {
  //SETS PLACEHOLDERS IN MODAL FORM
  profileFormValidate.resetValidation();
  profileNameInput.value = profileName.textContent; //Placeholder = Current profile name
  profileDescriptionInput.value = profileDescription.textContent; //Placeholder = Current description
}

// When you click the add card button (the +), it creates a new card.
function handleCardContent(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardImageInput.value;
  const card = new Card({ name, link }, "#card-template", () => {
    imagePopup.open(name, link);
  });
  cardFormValidate.resetValidation();
  newCardPopup.close();
}

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list"); // .cards__list is ul element

// Event listeners
profileEditBtn.addEventListener("click", () => {
  handleProfileInputValues();
  profileForm.open();
});

profileCloseBtn.addEventListener("click", () => {
  profileForm.close();
});

profileEditForm.addEventListener("submit", (event) => {
  userInfo.getUserInfo(profileName, profileDescription);
  // this is the submit action, that means in the EVENT we have an access to the form data (name, description)
  // so these data you need to use in the setUserInfo call
  userInfo.setUserInfo(profileName, profileDescription);
  profileFormValidate.resetValidation();
  profileForm.close();
});

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

function createCard(data) {
  const card = new Card(
    {
      data,
      // cardSelector,
      handleImageClick: () => {
        imagePopup.open(data.name, data.link);
      },
    },
    config.templateSelector
  );
  return card.getCardElement();
}
const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  config.containerSelector
);

cardList.renderItems(initialCards);
