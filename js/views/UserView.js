import UserController from "../controllers/UserController.js";

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
    if (this.displayUsername || this.displayXP) {
      this.displayUserInfo();
    }

    this.profileForm = document.getElementById("profileForm");
    if (this.profileForm) {
      this.updatePassword();
    }
  }

  checkLoggedUser() {
    this.userController.checkRoute();
  }

  logout() {
    this.logoutBtn.addEventListener("click", () => {
      sessionStorage.setItem("active", undefined);
      location.reload();
    });
  }

  displayUserInfo() {
    const userInfo = JSON.parse(sessionStorage.getItem("active"));
    for (const displayUsername of this.displayUsername) {
      displayUsername.innerHTML = userInfo.username;
    }
    for (const displayXP of this.displayXP) {
      displayXP.innerHTML = userInfo.xp ? `${userInfo.xp} XP` : `0 XP`;
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
        sessionStorage.setItem(
          "active",
          JSON.stringify({ ...userInfo, password: txtPassword.value })
        );
        const userList = JSON.parse(localStorage.getItem("users"));
        const newUserList = userList.map((userItem) =>
          userItem.username === userInfo.username
            ? { ...userItem, password: txtPassword.value }
            : userItem
        );
        localStorage.setItem("users", JSON.stringify(newUserList));
        alert("Password alterada com sucesso");
        location.href = "./landing_user.html";
      }

      this.profileForm.reset();
      e.preventDefault();
    });
  }
}
