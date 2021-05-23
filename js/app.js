import RegisterView from "./views/RegisterView.js";
import LoginView from "./views/LoginView.js";
import UserView from "./views/UserView.js";
import AdminView from "./views/AdminView.js";

class App {
  constructor() {
    this.routes = {
      "": [],
      index: [UserView],
      register: [UserView, RegisterView],
      login: [UserView, LoginView],
      admin_landing: [UserView],
      admin_users: [UserView, AdminView],
      admin_activities: [UserView, AdminView],
      admin_achievements: [UserView, AdminView],
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
        name: "admin",
        username: "admin",
        email: "",
        password: "adminpw",
        birthdate: "",
        gender: "",
      },
      {
        name: "user",
        username: "user",
        email: "user@gmail.com",
        password: "password",
        birthdate: "2000-02-10",
        gender: "M",
      },
    ];
    const activities = {
      quiz: {
        activityName: "QuizOn",
        activityXP: 300,
        activityQuestions: [
          {
            question: "pergunta sobre covid",
            rightAnswer: "certo",
            wrongAnswer: "errado",
          },
          {
            question: "pergunta sobre covid2",
            rightAnswer: "certo",
            wrongAnswer: "errado",
          },
        ],
      },
      trueOrFalse: {
        activityName: "CurioAtiv",
        activityXP: 100,
        activityQuestions: [{ question: "afirmação", type: "Falso" }],
      },
    };
    const achievements = [
      {
        type: "avatar",
        icon: "../img/cuidadoso.png",
        name: "O Cuidadoso",
        description: "100% de respostas certas no quiz.",
      },
    ];

    // Load the fixtures in case there is no data in the local storage
    if (!localStorage.users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
    if (!localStorage.activities) {
      localStorage.setItem("activities", JSON.stringify(activities));
    }
    if (!localStorage.achievements) {
      localStorage.setItem("achievements", JSON.stringify(achievements));
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
