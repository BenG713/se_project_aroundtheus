import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";

const newCardForm = new PopupWithForm(
  "#profile-card-modal",
  () => handleCardContent(),
  "#card-add-button"
);
newCardForm.setEventListeners();

const profileForm = new PopupWithForm(
  "#profile-edit-modal",
  (profileName, profileDescription) => {
    userInfo.getUserInfo(profileName, profileDescription);
    userInfo.setUserInfo(profileName, profileDescription);
    profileFormValidate.resetValidation();
    profileForm.close();
  },
  "#profile-edit-button",
  handleProfileInputValues
);
profileForm.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#modal-image",
});

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);

profileFormValidate.enableValidation();
profileFormValidate.resetValidation();
cardFormValidate.enableValidation();

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

function handleProfileInputValues() {
  //SETS PLACEHOLDERS IN MODAL FORM
  profileFormValidate.resetValidation();
  profileNameInput.value = profileName.textContent; //Placeholder = Current profile name
  profileDescriptionInput.value = profileDescription.textContent; //Placeholder = Current description
}

// When you click the add card button (the +), it creates a new card.
function handleCardContent() {
  const name = cardNameInput.value;
  const link = cardImageInput.value;
  cardList.addItem(createCard({ name, link }));
  cardFormValidate.resetValidation();
  newCardForm.close();
}

function handleImageClick(data) {
  imagePopup.open(data._name, data._link);
}

function createCard(data) {
  const card = new Card(data, config.templateSelector, handleImageClick);
  document.getElementById("card-name-input").value = "";
  document.getElementById("card-image-link-input").value = "";
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
