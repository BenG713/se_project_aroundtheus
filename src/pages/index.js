import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".card__add-button");
const profileDescriptionInput = document.getElementById("profile-description-input");
const profileNameInput = document.getElementById("profile-name-input");


profileEditButton.addEventListener("click", () => {
  const userInfo = profileUserInfo.getUserInfo();
  profileNameInput.value = userInfo.name;
  profileDescriptionInput.value = userInfo.description;
  profileModal.open();
});

addCardButton.addEventListener("click", () => {
  newCardModal.open();
});

const deleteModal = new PopupConfirm (

);



const newCardModal = new PopupWithForm(
  "#profile-card-modal",
  handleCardContent,
  "#card-add-button"
);

newCardModal.setEventListeners();
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileUserInfo = new UserInfo({ profileName, profileDescription });

const profileModal = new PopupWithForm("#profile-edit-modal", (userInput) => {
  profileUserInfo.setUserInfo(userInput); //used when submitting modal
  profileModal.close();
});

profileModal.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#modal-image",
});

imagePopup.setEventListeners();

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();

//inputs and information

// When you click the add card button (the +), it creates a new card.
function handleCardContent({ place: name, link }) {
  cardList.addItem(createCard({ name, link }));
  cardFormValidate.resetForm();
  newCardModal.close();
}

function handleImageClick(data) {
  imagePopup.open(data.name, data.link);
}

function handleDeleteConfirm(card){
  deleteModal.open(); // opens modal
  deleteModal.submitAction(() => {
    api.removeCard() //write removeCard function in Api class
    .then (() => {
      card.handleDeleteButton(), //removes card
      deleteModal.close()})
    .catch(()=> {}) 
  })
}

function createCard(data) {
  const card = new Card(data, config.templateSelector, handleImageClick, handleDeleteConfirm);

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


//token - c71139a8-616d-4539-81d5-960dbf139c46