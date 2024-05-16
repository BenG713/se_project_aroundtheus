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
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this.handleServerResponse);
  }

  loadCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
      },
    });
  }

  editProfile(body) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: body,
    }).then(this.handleServerResponse);
  }

  addCard(body) {
    //body => has name and image URL, get from add card form
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: body,
    }).then(this.handleServerResponse);
  }

  removeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleServerResponse);
  }

  likeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "PUT", //updating existing data
      headers: this.headers,
    }).then(this.handleServerResponse);
  }

  unlikeCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this.handleServerResponse);
  }

  updateProfilePicture(body) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: body,
    }).then(this.handleServerResponse);
  }
}

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c71139a8-616d-4539-81d5-960dbf139c46",
    "Content-Type": "application/json",
  },
});
