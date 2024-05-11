export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  handleServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // if the server returns an error, reject the promise
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this.handleServerResponse);
  }

  loadUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
      },
    });
  }

  loadCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
      },
    });
  }

  editProfile() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Marie Skłodowska Curie",
        about: "Physicist and Chemist",
      }),
    });
  }

  addCard(body) {
    //body => has name and image URL, get from add card form
    fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: body,
    });
  }

  removeCard(id) {
    console.log(id);
    fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleServerResponse);
  }

  likeCard() {
    fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/cardId/likes",
      {
        method: "PUT",
        headers: {
          authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
        },
      }
    );
  }

  unlikeCard() {
    fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/cardId/likes",
      {
        method: "DELETE",
        headers: {
          authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
        },
      }
    );
  }

  updateProfilePicture() {
    fetch("https://around-api.en.tripleten-services.com/v1/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
      },
    });
  }
}
