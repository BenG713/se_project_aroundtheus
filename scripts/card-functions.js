const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

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

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.src = cardLink; //adds card image
  cardImageEl.alt = cardName; //adds card alt text
  cardNameTextEl.textContent = cardName; //Description equals alt text
  return cardElement;
}
