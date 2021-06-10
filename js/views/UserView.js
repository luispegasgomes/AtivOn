import UserController from "../controllers/UserController.js";
import StorageController from "../controllers/StorageController.js";

export default class UserView {
  constructor() {
    this.userController = new UserController();
    this.checkLoggedUser();
    this.logoutBtn = document.getElementById("logout");
    if (this.logoutBtn) {
      this.logout();
    }
    this.displayUsername = document.getElementsByClassName("displayUsername");
    this.displayXP = document.getElementsByClassName("displayXP");
    this.userName = document.getElementById("userName");
    this.userEmail = document.getElementById("userEmail");
    this.userBirthdate = document.getElementById("userBirthdate");
    if (this.displayUsername || this.displayXP) {
      this.displayUserInfo();
    }

    this.profileForm = document.getElementById("profileForm");
    if (this.profileForm) {
      this.updatePassword();
    }
    this.storageController = new StorageController();
  }

  checkLoggedUser() {
    this.userController.checkRoute();
  }

  logout() {
    this.logoutBtn.addEventListener("click", () => {
      this.storageController.updateSessionStorage(
        "active",
        JSON.stringify({ type: "none" })
      );
      location.reload();
    });
  }

  displayUserInfo() {
    const userInfo = JSON.parse(sessionStorage.getItem("active"));
    for (const displayUsername of this.displayUsername) {
      displayUsername.innerHTML = userInfo.username;
    }
    for (const displayXP of this.displayXP) {
      displayXP.innerHTML = userInfo.xp
        ? ` Nível ${Math.trunc(userInfo.xp / 100)} <br /> ${userInfo.xp} XP`
        : `Nível 0 <br /> 0 XP`;
    }

    if (this.userName) {
      this.userName.innerHTML = userInfo.name;
    }
    if (this.userEmail) {
      this.userEmail.innerHTML = userInfo.email;
    }
    if (this.userBirthdate) {
      this.userBirthdate.innerHTML = userInfo.birthdate;
    }
  }

  updatePassword() {
    this.profileForm.addEventListener("submit", (e) => {
      const txtPassword = document.getElementById("txtPassword");
      const txtConfPassword = document.getElementById("txtConfPassword");
      const userInfo = JSON.parse(sessionStorage.getItem("active"));

      if (txtPassword.value !== txtConfPassword.value) {
        alert("As passwords são diferentes");
      } else if (txtPassword.value === userInfo.password) {
        alert("Não podes mudar para a mesma password");
      } else {
        this.storageController.updateSessionStorage(
          "active",
          JSON.stringify({ ...userInfo, password: txtPassword.value })
        );
        const userList = JSON.parse(localStorage.getItem("users"));
        const newUserList = userList.map((userItem) =>
          userItem.username === userInfo.username
            ? { ...userItem, password: txtPassword.value }
            : userItem
        );
        this.storageController.updateLocalStorage(
          "users",
          JSON.stringify(newUserList)
        );
        alert("Password alterada com sucesso");
        location.href = "./landing_user.html";
      }

      this.profileForm.reset();
      e.preventDefault();
    });
  }
}
