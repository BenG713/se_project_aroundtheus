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

// Variables

const profileEditBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseBtn = document.querySelector("#close-button");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__save");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

// Functions

function closePopUp() {
  profileEditModal.classList.remove("modal_opened");
}

function handleProfileEditSave(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp();
}

// Event listeners

profileEditBtn.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
});

profileEditBtn.addEventListener("click", () => {
  profileDescriptionInput.value = profileDescription.textContent;
});

profileEditBtn.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
});

profileCloseBtn.addEventListener("click", () => {
  closePopUp();
});

profileEditForm.addEventListener("click", handleProfileEditSave);
const cardListEl = document.querySelector(".cards__list");

initialCards.forEach((cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  console.log(cardData);

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  const cardDescriptionTextEl = cardElement.querySelector(
    ".card__description-text"
  );

  const cardLikeButtonEl = cardElement.querySelector(".card__like-button");

  cardDescriptionTextEl.textContent = cardData.name;

  cardListEl.prepend(cardElement);
});
