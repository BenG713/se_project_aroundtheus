import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";

const newCardModal = new PopupWithForm(
  "#profile-card-modal",
  handleCardContent,
  "#card-add-button"
);

const profileModal = new PopupWithForm(
  "#profile-edit-modal",
  (userInput) => {
    userInfo.setUserInfo(userInput);
    profileFormValidate.resetValidation();
    profileModal.close();
  },
  "#profile-edit-button",
  handleProfileReset
);

const imagePopup = new PopupWithImage({
  popupSelector: "#modal-image",
});

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);

profileFormValidate.enableValidation();
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

function handleProfileReset() {
  profileFormValidate.resetValidation(); 

}

// When you click the add card button (the +), it creates a new card.
function handleCardContent() {
  const name = cardNameInput.value;
  const link = cardImageInput.value;
  cardList.addItem(createCard({ name, link }));
  cardFormValidate.resetValidation();
  newCardModal.close();
}

function handleImageClick(data) {
  imagePopup.open(data._name, data._link);
}

function createCard(data) {
  const card = new Card(data, config.templateSelector, handleImageClick);
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

cardList.renderItems();
