import UserController from "../controllers/UtilizadorController.js";

export default class RegistoView {
  constructor() {
    this.userController = new UserController();
    this.txtNome = document.getElementById("txtNome");
    this.txtApelido = document.getElementById("txtApelido");
    this.txtNomeUtilizador = document.getElementById("txtNomeUtilizador");
    this.txtEmail = document.getElementById("txtEmail");
    this.txtPassword = document.getElementById("txtPassword");
    this.txtConfPassword = document.getElementById("txtConfPassword");
    this.txtDataNascimento = document.getElementById("txtDataNascimento");
    this.feminino = document.getElementById("feminino");
    this.masculino = document.getElementById("masculino");
    this.registoBtn = document.getElementById("registoBtn");

    this.bindRegisterForm();
  }

  bindRegisterForm() {
    this.registoBtn.addEventListener("click", () => {
      if (feminino.checked || this.masculino.checked) {
        if (txtPassword.value === txtConfPassword.value) {
          this.userController.register(
            txtNome.value.concat("", txtApelido.value),
            txtNomeUtilizador.value,
            txtEmail.value,
            txtPassword.value,
            txtDataNascimento.value,
            feminino.checked ? "Feminino" : "Masculino"
          );
        } else {
          alert("Passwords diferentes");
        }
      } else {
        alert("Seleciona um género");
      }
    });
  }
}
