import UtilizadorController from "../controllers/UtilizadorController.js";

export default class LoginView {
  constructor() {
    this.utilizadorController = new UtilizadorController();
    this.txtUtilizador = document.getElementById("txtUtilizador");
    this.txtPassword = document.getElementById("txtPassword");
    this.loginBtn = document.getElementById("loginBtn");

    this.bindLoginForm();
  }

  bindLoginForm() {
    this.loginBtn.addEventListener("click", () => {
      try {
        this.utilizadorController.login(
          this.txtUtilizador.value,
          this.txtPassword.value
        );
      } catch (e) {
        alert("Valores inválidos");
      }
    });
  }
}
