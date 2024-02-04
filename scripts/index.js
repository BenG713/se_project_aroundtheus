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

document.querySelectorAll(".modal").forEach((el) => {
  addEventListener("click", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closePopUp();
    }
  });
});

function closePopUp() {
  const isModalOpen = document.querySelector(".modal_opened");
  if (isModalOpen) {
    isModalOpen.classList.remove("modal_opened");
  }
}

function handleProfileTextContent(e) {
  e.preventDefault(); //stops page from refreshing
  profileName.textContent = profileNameInput.value; //Profile name = what was entered in modal
  profileDescription.textContent = profileDescriptionInput.value; // ""
  closePopUp();
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
  closePopUp();
  cardEditForm.reset();
}

function renderCard(cardName, cardLink) {
  const cardElement = cardTemplate.cloneNode(true); //clones card template
  const cardImageEl = cardElement.querySelector(".card__image"); //adds card image div
  const cardNameTextEl = cardElement.querySelector(".card__description-text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openPopup(imageModal);
    previewImage.src = cardLink;
    previewImage.alt = cardName;
    previewTitle.textContent = cardName;
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
const previewImage = imageModal.querySelector(".modal__preview-image");
const previewTitle = imageModal.querySelector(".modal__preview-title");

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

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list"); // .cards__list is ul element

// Event listeners
profileEditBtn.addEventListener("click", handleProfileInputValues);

profileCloseBtn.addEventListener("click", () => {
  closePopUp();
});

profileEditForm.addEventListener("submit", handleProfileTextContent);

document.addEventListener("keypress", function (evt) {
  if (evt.key === "Escape") {
    closePopUp();
  }
  document.removeEventListener("keypress", function (evt) {
    if (evt.key === "Escape") {
      closePopUp();
    }
  });
});

cardEditBtn.addEventListener("click", () => {
  openPopup(cardEditModal);
});

cardCloseBtn.addEventListener("click", () => {
  closePopUp();
});

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopUp();
  }
});

cardEditForm.addEventListener("submit", handleCardContent);

imageCloseBtn.addEventListener("click", () => {
  closePopUp();
});

initialCards.forEach((cardData) => {
  const cardElement = renderCard(cardData.name, cardData.link);
  cardListEl.prepend(cardElement);
});
