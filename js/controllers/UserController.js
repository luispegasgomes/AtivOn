import UserModel from "../models/UserModel.js";
import StorageController from "./StorageController.js";

export default class UserController {
  constructor() {
    this.users = localStorage.users ? JSON.parse(localStorage.users) : [];
    this.storageController = new StorageController();
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
      this.storageController.updateLocalStorage(
        "users",
        JSON.stringify(this.users)
      );
      this.storageController.updateSessionStorage(
        "active",
        JSON.stringify(newUser)
      );
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
      if (utilizador.status == "active") {
        this.storageController.updateSessionStorage(
          "active",
          JSON.stringify(utilizador)
        );
      } else {
        alert("Utilizador bloqueado");
      }
    } else {
      Swal.fire({
        imageUrl: "../img/",
        imageWidth: 200,
        imageHeight: 200,
        title: "Erro!",
        html: `Inseriste os teus dados incorretamente!`,
        confirmButtonColor: "#8ecae6",
        confirmButtonText: "Volta para o início!",
      }).then((result) => {
        if (result.value) {
          window.location.href = `./index.html`;
        }
      });
      
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
      "activities",
      "completa",
      "info_Covid",
      "landing_user",
      "leaderboard",
      "profile",
      "quizOn",
      "trophies",
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
  getAvatarByLevel() {
    const achievements = JSON.parse(localStorage.achievements);
    const userInfo = JSON.parse(sessionStorage.active);
    const level = userInfo.xp ? Math.trunc(userInfo.xp / 100) : 0;
    let possibleAvatares = achievements
      .sort((a, b) => a.level - b.level)
      .filter((obj) => obj.level <= level && obj.type == "avatar");
    return possibleAvatares[possibleAvatares.length - 1];
  }
}
