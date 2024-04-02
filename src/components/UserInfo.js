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

  setUserInfo(profileName, profileDescription) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
  }
}

export default UserInfo;
