import UserModel from "../models/UserModel.js";

export default class UserController {
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
        new UserModel(nome, username, email, password, dataNascimento, genero)
      );
      localStorage.setItem("users", JSON.stringify(this.users));
      sessionStorage.setItem("active", username);
      location.href = "./landing_user.html";
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
        location.href = "./admin_landing.html";
      } else {
        location.href = "./landing_user.html";
      }
    } else {
      alert("Erro!");
    }
  }

  checkRoute() {
    const publicRoutes = ["index", "login", "register"];
    const adminRoutes = [
      "admin_landing",
      "admin_users",
      "admin_activities",
      "admin_medals",
    ];
    const userRoutes = [
      "landing_user",
      "profile",
      "games",
      "CurioAtiv",
      "statistics",
      "trophies",
      "info_Covid",
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
        location.href = "./html/admin_landing.html";
      } else if (sessionStorage.getItem("active") != undefined) {
        location.href = "./html/landing_user.html";
      }
    }

    if (
      sessionStorage.getItem("active") == "admin" &&
      userRoutes.some((userRoute) => userRoute === route)
    ) {
      location.href = "./admin_landing.html";
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
