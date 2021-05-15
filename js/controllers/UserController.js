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
      if (username === "admin") {
        location.href = "http://127.0.0.1:5500/html/landing_admin.html";
      } else {
        location.href = "http://127.0.0.1:5500/html/landing.html";
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
        location.href = "http://127.0.0.1:5500/html/landing_admin.html";
      } else {
        location.href = "http://127.0.0.1:5500/html/landing.html";
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

    console.log(sessionStorage.getItem("active"));
    console.log(route);

    if (
      sessionStorage.getItem("active") &&
      publicRoutes.some((publicRoute) => publicRoute === route)
    ) {
      if (sessionStorage.getItem("active") === "admin") {
        location.href = "http://127.0.0.1:5500/html/landing_admin.html";
      } else {
        location.href = "http://127.0.0.1:5500/html/landing.html";
      }
    }
  }

  /* if (sessionStorage.getItem("active") && route in publicRoutes) {
      if (sessionStorage.getItem("active") === "admin") {
        location.href = "http://127.0.0.1:5500/html/landing_admin.html";
      } else {
        location.href = "http://127.0.0.1:5500/html/landing.html";
      }
    } else if (!sessionStorage.getItem("active") && !(route in publicRoutes)) {
      location.href = "http://127.0.0.1:5500/index.html";
    }
  } */
}
