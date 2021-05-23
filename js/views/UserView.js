import UserController from "../controllers/UserController.js";

export default class UserView {
  constructor() {
    this.userController = new UserController();
    this.checkLoggedUser();
    this.logoutBtn = document.getElementById("logout");
    if (this.logoutBtn) {
      this.logout();
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
}
