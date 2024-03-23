class UserInfo {
  constructor({ profileName, profileDescription }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }

  getUserInfo() {
    return {
      name: this._profileName,
      description: this._profileDescription,
    };
  }

  setUserInfo() {
    this._profileName.textContent = document.querySelector(
      "#profile-name-input"
    ).value;
    this._profileDescription.textContent = document.querySelector(
      "#profile-description-input"
    ).value;
  }
}

export default UserInfo;
