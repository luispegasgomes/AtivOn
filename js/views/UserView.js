import UserController from "../controllers/UserController.js";

export default class UserView {
  constructor() {
    this.userController = new UserController();
    this.checkLoggedUser();
    this.logoutBtn = document.getElementById("logout");
    if (this.logoutBtn) {
      this.logout();
    }
    //classe displayUsername - vai buscar o username ao sessionStorage
    //classe displayXP - se não existir o atributo XP, vai aparecer "Nível 1 - 0 XP"
    // chamar vars e função no construtor, fazer lógica no displayUserInfo()
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

  displayUserInfo()
}
