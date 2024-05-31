class UserInfo {
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDescription.textContent,
      avatar: this._profileAvatar.src
    };
  }

  setUserInfo(userInput) {
    if (userInput.name.length) {
      this._profileName.textContent = userInput.name;
    }
    if (userInput.description.length) {
      this._profileDescription.textContent = userInput.description;
    }
    if (userInput.avatar?.length) {
      this._profileAvatar.src = userInput.avatar;
    }
  }
}

export default UserInfo;
