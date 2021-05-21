import RegisterView from "./views/RegisterView.js";
import LoginView from "./views/LoginView.js";
import UserView from "./views/UserView.js";

class App {
  constructor() {
    this.routes = {
      "": [],
      index: [UserView],
      register: [UserView, RegisterView],
      login: [UserView, LoginView],
      admin_landing: [UserView],
      admin_users: [UserView],
      admin_activities: [UserView],
      admin_medals: [UserView],
      landing_user: [UserView],
      profile: [UserView],
      games: [UserView],
      CurioAtiv: [UserView],
      statistics: [UserView],
      trophies: [UserView],
      info_Covid: [UserView],
    };

    // import dummy data for testing purposes
    this.#importDataFixtures();

    // instantiate the views mapped in the routes object
    this.#instantiateViews();
  }

  #importDataFixtures() {
    const users = [
      {
        nome: "admin",
        username: "admin",
        email: "",
        password: "adminpw",
        dataNascimento: "",
        genero: "",
      },
      {
        nome: "user",
        username: "user",
        email: "user@gmail.com",
        password: "password",
        dataNascimento: "",
        genero: "",
      },
    ];

    // Load the fixtures in case there is no data in the local storage
    if (!localStorage.users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    if (!sessionStorage.active) {
      sessionStorage.setItem("active", undefined);
    }
  }

  #instantiateViews() {
    const path = window.location.pathname;
    const file = path.substr(path.lastIndexOf("/") + 1);
    const route = file.split(".")[0];
    const views = this.#getViews(route);
    for (const view of views) {
      new view();
    }
  }

  #getViews(route) {
    return typeof this.routes[route] === "undefined" ? [] : this.routes[route];
  }
}

new App();
