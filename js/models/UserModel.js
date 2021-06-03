export default class UserModel {
  constructor(
    name,
    username,
    email,
    password,
    birthdate,
    gender,
    type,
    status
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
    this.gender = gender;
    this.type = type;
    this.status = status;
  }
}
