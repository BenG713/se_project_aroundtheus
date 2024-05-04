class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
    })
  }

  loadUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
    })
  }

  loadCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
  })
  }

  editProfile() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist"
      })
    });
  }

  addCard() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
        "Content-Type": ""},
    })
  }

  removeCard() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards/5d1f0611d321eb4bdcd707dd", {
      method: "DELETE",
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
    })
  }

  likeCard() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
      method: "PUT",
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
    })
  }

  unlikeCard() {
    fetch("https://around-api.en.tripleten-services.com/v1/cards/cardId/likes", {
      method: "DELETE",
      headers: {
      authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
    })
  }

  updateProfilePicture() {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
      authorization: "c71139a8-616d-4539-81d5-960dbf139c46"
      }
    })
  }





}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
    "Content-Type": "application/json"
  }
});


  