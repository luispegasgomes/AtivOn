import UtilizadorModel from "../models/UtilizadorModel.js";

export default class UtilizadorController {
  constructor() {
    this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
  }

  register(nome, username, email, password, dataNascimento, genero) {
    if (
      this.users.find(
        (user) => user.username === username || user.email === email
      )
    ) {
      alert(
        `Alguém já tem o nome de utilizador "${username}" ou email "${email}" `
      );
    } else {
      this.users.push(
        new UtilizadorModel(
          nome,
          username,
          email,
          password,
          dataNascimento,
          genero
        )
      );
      localStorage.setItem("users", JSON.stringify(this.users));
      sessionStorage.setItem("active", username);
      if (username === "admin") {
        location.href = "./landing_admin.html";
      } else {
        location.href = "./landing_user.html";
      }
    }
  }

  login(identificador, password) {
    const utilizador = this.users.find(
      (user) =>
        (user.username === identificador || user.email == identificador) &&
        user.password === password
    );
    if (utilizador) {
      sessionStorage.setItem("active", utilizador.username);
      if (utilizador.username === "admin") {
        location.href = "./landing_admin.html";
      } else {
        location.href = "./landing_user.html";
      }
    } else {
      alert("Erro!");
    }
  }

  checkRoute() {
    const publicRoutes = ["index", "login", "registo"];
    const path = window.location.pathname;
    const file = path.substr(path.lastIndexOf("/") + 1);
    const route = file.split(".")[0];

    if (
      sessionStorage.getItem("active") != "undefined" &&
      publicRoutes.some((publicRoute) => publicRoute === route)
    ) {
      if (sessionStorage.getItem("active") === "admin") {
        location.href = "./html/landing_admin.html";
      } else if (sessionStorage.getItem("active") != undefined) {
        location.href = "./html/landing_user.html";
      }
    }
  }
}
