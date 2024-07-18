class RegisterUser {
  constructor(payload) {
    this._verifyPayload(payload);

    const { username, password, fullname } = payload;

    this.username = username;
    this.fullname = fullname;
    this.password = password;
  }

  _verifyPayload({ username, password, fullname }) {
    if (!username || !password || !fullname) {
      throw new Error("REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY");
    }

    if (
      typeof username != "string" ||
      typeof fullname != "string" ||
      typeof password != "string"
    ) {
      throw new Error("REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATIONS");
    }

    if (username.length > 50) {
      throw new Error("REGISTER_USER.USERNAME_LIMIT_CHAR");
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error("REGISTER_USER.USERNAME_CONTAINS_RESTRICTED_CHARACTER");
    }
  }
}

module.exports = RegisterUser;