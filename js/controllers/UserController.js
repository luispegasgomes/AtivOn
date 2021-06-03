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
      const newUser = new UserModel(
        nome,
        username,
        email,
        password,
        dataNascimento,
        genero,
        "child",
        "active"
      );
      this.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(this.users));
      sessionStorage.setItem("active", JSON.stringify(newUser));
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
      sessionStorage.setItem("active", JSON.stringify(utilizador));
    } else {
      alert("Erro!");
    }
  }

  getType() {
    return JSON.parse(sessionStorage.getItem("active")).type;
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
    const activeUser = JSON.parse(sessionStorage.getItem("active"));

    if (
      activeUser.type == "none" &&
      (adminRoutes.some((adminRoute) => adminRoute === route) ||
        userRoutes.some((userRoute) => userRoute === route))
    ) {
      location.href = "../index.html";
    }

    if (
      activeUser.type != "none" &&
      publicRoutes.some((publicRoute) => publicRoute === route)
    ) {
      if (activeUser.type === "admin") {
        location.href = "./html/admin_landing.html";
      } else if (activeUser.type != undefined) {
        location.href = "./html/landing_user.html";
      }
    }

    if (
      activeUser.type == "admin" &&
      userRoutes.some((userRoute) => userRoute === route)
    ) {
      location.href = "./admin_landing.html";
    }

    if (
      activeUser.type != "none" &&
      activeUser.type != "admin" &&
      adminRoutes.some((adminRoute) => adminRoute === route)
    ) {
      location.href = "./landing_user.html";
    }
  }
}
