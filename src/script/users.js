class User {
  constructor(fullname, email, password, joinDate, phoneNumber, address, cover, avatar) {
    this.fullname = fullname;
    this.email = email;
    this.password = password;
    this.joinDate = joinDate;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.cover = cover;
    this.avatar = avatar;
  }

  set setFullName(fullname) {
    this.fullname = fullname;
  }

  set setEmail(email) {
    this.email = email;
  }

  set setPassword(password) {
    this.password = password;
  }

  set setJoinDate(joinDate) {
    this.joinDate = joinDate;
  }

  set setAddress(address) {
    this.address = address;
  }

  set setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;
  }

  set setAvatar(avatar) {
    this.avatar = avatar;
  }

  set setCover(cover) {
    this.cover = cover;
  }

  get getFullName() {
    return this.fullname;
  }

  get getEmail() {
    return this.email;
  }

  get getPassword() {
    return this.password;
  }

  get getJoinDate() {
    return this.joinDate;
  }

  get getAddress() {
    return this.address;
  }

  get getPhoneNumber() {
    return this.phoneNumber;
  }

  get getAvatar() {
    return this.avatar;
  }

  get getCover() {
    return this.cover;
  }
}

export default User;
