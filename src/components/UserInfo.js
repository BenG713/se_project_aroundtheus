class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
    };
  }

  setUserInfo(userInput) {
    if (userInput.name.length) {
      this._profileName.textContent = userInput.name;
    }
    if (userInput.description.length) {
      this._profileDescription.textContent = userInput.description;
    }
  }
}

export default UserInfo;
