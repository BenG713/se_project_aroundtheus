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

function openPopup(modal) {
  modal.classList.add("modal_opened"); // Opens modal
}

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileTextContent(e) {
  e.preventDefault(); //stops page from refreshing
  profileName.textContent = profileNameInput.value; //Profile name = what was entered in modal
  profileDescription.textContent = profileDescriptionInput.value; // ""
  closePopUp(profileEditModal);
}

function handleProfileInputValues() {
  openPopup(profileEditModal);
  profileNameInput.value = profileName.textContent; //Placeholder = Current profile name
  profileDescriptionInput.value = profileDescription.textContent; //Placeholder = Current description
}

function handleCardContent(e) {
  e.preventDefault();
  const name = cardNameInput.value;
  const link = cardImageInput.value;

  const returnedElement = renderCard(name, link);
  cardListEl.prepend(returnedElement);
  closePopUp(cardEditModal);
}

function renderCard(cardName, cardLink) {
  const cardElement = cardTemplate.cloneNode(true); //clones card template
  const cardImageEl = cardElement.querySelector(".card__image"); //adds card image div
  const cardNameTextEl = cardElement.querySelector(".card__description-text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const imageCaption = cardElement.querySelector(".modal__preview-description");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(imageModal);
    imageModal.querySelector(".modal__preview-image").src = cardLink;
    imageModal.querySelector(".modal__preview-description").alt = cardName;
    imageModal.querySelector(".modal__preview-description").textContent =
      cardName;
  });

  cardImageEl.src = cardLink; //adds card image
  cardImageEl.alt = cardName; //adds card alt text
  cardNameTextEl.textContent = cardName; //Description equals alt text
  return cardElement;
}

// Buttons
const profileEditBtn = document.querySelector("#profile-edit-button");
const cardEditBtn = document.querySelector("#profile-add-button");
const profileCloseBtn = document.querySelector("#close-button");
const cardCloseBtn = document.querySelector("#card-close-button");
const imageCloseBtn = document.querySelector("#image-close-button");

//Modals
const profileEditModal = document.querySelector("#profile-edit-modal");
const cardEditModal = document.querySelector("#profile-card-modal");
const imageModal = document.querySelector("#modal-image");

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
  cardEditForm.reset();
});

cardCloseBtn.addEventListener("click", () => {
  closePopUp(cardEditModal);
});

cardEditForm.addEventListener("submit", handleCardContent);

imageCloseBtn.addEventListener("click", () => {
  closePopUp(imageModal);
});

initialCards.forEach((cardData) => {
  const cardElement = renderCard(cardData.name, cardData.link);
  cardListEl.prepend(cardElement);
});
