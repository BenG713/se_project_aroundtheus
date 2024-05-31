import "./index.css";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import { PopupConfirm } from "../components/PopupConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import { config, initialCards } from "../utils/constants.js";
import { api } from "../components/api.js";

const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".card__add-button");
const profileDescriptionInput = document.getElementById(
  "profile-description-input"
);
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

const deleteModal = new PopupConfirm({ popupSelector: "#are-you-sure" });

deleteModal.setEventListeners();

const newCardModal = new PopupWithForm(
  "#profile-card-modal",
  handleCardContent,
  "#card-add-button" // TODO do we need this third argument?
);

newCardModal.setEventListeners();

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const avatarEditBtn = document.querySelector(".pencil-icon");
const profileUserInfo = new UserInfo({
  profileName,
  profileDescription,
  profileAvatar,
});

const profileModal = new PopupWithForm("#profile-edit-modal", (userInput) => {
  profileModal.setButtonLoadingState(true);
  api
    .editProfile(
      JSON.stringify({ name: userInput.name, about: userInput.description })
    )
    .then(() => {
      profileUserInfo.setUserInfo(userInput); //used when submitting modal
      profileModal.close();
      profileModal.setButtonLoadingState(false);
    });
});

profileModal.setEventListeners();

avatarEditBtn.addEventListener("click", () => {
  avatarModal.open();
});

const avatarModal = new PopupWithForm("#avatar-edit-modal", (userInput) => {
  api
    .updateProfilePicture(JSON.stringify({ avatar: userInput.avatar }))
    .then((json) => {
      profileUserInfo.setUserInfo(userInput); //used when submitting modal
      avatarModal.close();
    });
});

avatarModal.setEventListeners();

const imagePopup = new PopupWithImage({
  popupSelector: "#modal-image",
});

imagePopup.setEventListeners();

const profileFormValidate = new FormValidator("#profile-form", config);
const cardFormValidate = new FormValidator("#card-form", config);
const avatarValidate = new FormValidator("#avatar-form", config);

profileFormValidate.enableValidation();
cardFormValidate.enableValidation();
avatarValidate.enableValidation();

//inputs and information

// When you click the add card button (the +), it creates a new card.
function handleCardContent({ place: name, link }) {
  //
  api.addCard(JSON.stringify({ name, link })).then((card) => {
    //creating card on server
    cardList.addItem(createCard({ name, link, id: card._id })); //after getting response, creating card in browser
    cardFormValidate.resetForm();
    newCardModal.close();

  })
  .catch((error)=>{
    /// how do we handle the error
  })
  .finally(()=>{})
}

function handleImageClick(data) {
  imagePopup.open(data._name, data._link);
}

function handleDeleteConfirm(card) {
  deleteModal.open(); // opens modal
  deleteModal.submitAction(() => {
    api
      .removeCard(card.id)
      .then(() => {
        card.removeCard(); //removes card
        deleteModal.close();
      })
      .catch(() => {});
  });
}

function createCard(data) {
  const card = new Card(
    data,
    config.templateSelector,
    handleImageClick,
    handleDeleteConfirm
  );
  return card.getCardElement();
}

let cards = [];
const cardList = new Section(
  {
    items: cards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  config.containerSelector
);

api.getInitialCards().then((userInfo) => {
  profileUserInfo.setUserInfo({
    name: userInfo.name,
    description: userInfo.about,
    avatar: userInfo.avatar,
  });
});

api.getInitialCards().then((result) => {
  result.reverse().forEach((item) => {
    cardList.addItem(
      createCard({
        name: item.name,
        link: item.link,
        id: item._id,
        isLiked: item.isLiked,
      })
    );
  });
});

cardList.renderItems();

//token - c71139a8-616d-4539-81d5-960dbf139c46
