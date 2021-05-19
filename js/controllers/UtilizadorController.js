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
    const adminRoutes = [
      "landing_admin",
      "ver_utilizadores",
      "gerir_atividades",
      "gerir_medalhas",
    ];
    const userRoutes = [
      "landing_user",
      "perfil",
      "jogos",
      "jogo",
      "estatisticas",
      "trofeus",
      "info",
    ];
    const path = window.location.pathname;
    const file = path.substr(path.lastIndexOf("/") + 1);
    const route = file.split(".")[0];

    if (
      sessionStorage.getItem("active") == "undefined" &&
      (adminRoutes.some((adminRoute) => adminRoute === route) ||
        userRoutes.some((userRoute) => userRoute === route))
    ) {
      location.href = "../index.html";
    }

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

    if (
      sessionStorage.getItem("active") == "admin" &&
      userRoutes.some((userRoute) => userRoute === route)
    ) {
      location.href = "./landing_admin.html";
    }

    if (
      sessionStorage.getItem("active") != "undefined" &&
      sessionStorage.getItem("active") != "admin" &&
      adminRoutes.some((adminRoute) => adminRoute === route)
    ) {
      location.href = "./landing_user.html";
    }
  }
}
