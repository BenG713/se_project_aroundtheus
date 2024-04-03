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

  setUserInfo(userInput) {
    this._profileName.textContent = userInput.name; 
    this._profileDescription.textContent = userInput.description;
  }
}

export default UserInfo;
