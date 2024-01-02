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

function handleProfileInputValues(e) {
  openPopup(profileEditModal);
  profileNameInput.value = profileName.textContent; //Placeholder = Current profile name
  profileDescriptionInput.value = profileDescription.textContent; //Placeholder = Current description
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const getCardElement = renderCard();
  closePopUp(cardEditModal); //work on this later...bitch
}

function renderCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true); //clones card template
  const cardImageEl = cardElement.querySelector(".card__image"); //adds card image div
  const cardNameTextEl = cardElement.querySelector(".card__description-text");
  const likeButton = cardElement.querySelector(".card__like-button");

  //find delete button and assign it a variable
  //add event listener to the delete button
  //cardElement.remove();
  //add click listener to card image element

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link; //adds card image
  cardImageEl.alt = cardData.name; //adds card alt text
  cardNameTextEl.textContent = cardData.name; //Description equals alt text

  return cardElement;
}
