import UserController from "../controllers/UserController.js";

export default class LoginView {
  constructor() {
    this.userController = new UserController();
    this.txtUtilizador = document.getElementById("txtUtilizador");
    this.txtPassword = document.getElementById("txtPassword");
    this.loginBtn = document.getElementById("loginBtn");

    this.bindLoginForm();
  }

  bindLoginForm() {
    this.loginBtn.addEventListener("click", () => {
      try {
        this.userController.login(
          this.txtUtilizador.value,
          this.txtPassword.value
        );
      } catch (e) {
        alert("Valores inválidos");
      }
    });
  }
}
