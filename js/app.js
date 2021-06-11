import RegisterView from "./views/RegisterView.js";
import LoginView from "./views/LoginView.js";
import UserView from "./views/UserView.js";
import AdminView from "./views/AdminView.js";
import GameView from "./views/GameView.js";
import AchievementView from "./views/AchievementsView.js";
import LeaderboardView from "./views/LeaderboardView.js";

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
      landing_user: [UserView, GameView],
      profile: [UserView],
      activities: [UserView],
      completa: [UserView, GameView],
      quizOn: [UserView, GameView],
      leaderboard: [UserView, LeaderboardView],
      trophies: [UserView, AchievementView],
      info_Covid: [UserView],
      statistics: [UserView],
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
        type: "admin",
        status: "active",
      },
      {
        name: "Joana Portugal",
        username: "joanap",
        email: "jojo@gmail.com",
        password: "password",
        birthdate: "2000-07-14",
        gender: "F",
        type: "child",
        status: "active",
      },
      {
        name: "Luís Gomes",
        username: "luisg",
        email: "lulu@gmail.com",
        password: "password",
        birthdate: "2000-09-15",
        gender: "M",
        type: "child",
        status: "active",
      },
      {
        name: "Gustavo Silva",
        username: "gustavos",
        email: "gugu@gmail.com",
        password: "password",
        birthdate: "2000-02-23",
        gender: "M",
        type: "child",
        status: "active",
      },
    ];
    const activities = {
      quiz: {
        activityName: "QuizOn",
        activityXP: 50,
        activityQuestions: [
          {
            question:
              "Qual a distância mínima a que devo estar de outra pessoa, para evitar ser infetado pelo SARS-CoV-2?",
            rightAnswer: "Cerca de dois metros",
            wrongAnswer: "Cerca de cinco metros",
          },
          {
            question: "De que forma podemos ficar infetados com o SARS-CoV-2?",
            rightAnswer:
              "Através de gotículas libertadas pela fala, tosse ou espirro de uma pessoa infetada ",
            wrongAnswer: "Estando a cerca de 20 metros de uma pessoa infetada",
          },
          {
            question:
              "É verdade que o COVID-19 afeta principalmente pessoas idosas e com doenças crónicas?",
            rightAnswer: "Não",
            wrongAnswer: "Sim",
          },
          {
            question:
              "Lavar as mãos deve ser realizada após o contacto com animais?",
            rightAnswer: "Sim",
            wrongAnswer: "Não",
          },
          {
            question:
              "Em Portugal, a partir de que idade é obrigatória a utilização de máscara em locais públicos fechados (ex. supermercado, farmácias, transportes públicos) e em locais ao ar livre (quando não for possível manter o distanciamento físico de 1,5 a 2 metros)?",
            rightAnswer: "A partir dos 10 anos, inclusive",
            wrongAnswer: "A partir dos 15 anos",
          },
          {
            question:
              "O tempo entre a exposição ao vírus SARS-CoV-2 e os primeiros sintomas é de:",
            rightAnswer: "Cerca de 2 a 14 dias",
            wrongAnswer: "Cerca de 2 a 5 dias",
          },
          {
            question:
              "As pessoas que têm indicação para usar máscaras de proteção devem substituí-las com que frequência?",
            rightAnswer: "De 4 em 4 horas ou sempre que estiverem molhadas",
            wrongAnswer: "De 2 em 2 horas e sempre que estiverem molhadas",
          },
          {
            question:
              "Se esteve em contacto com algum doente suspeito ou confirmado com COVID-19 e, entretanto, tiver febre, tosse, perda do olfato e/ou do paladar ou dificuldade em respirar, devo:",
            rightAnswer: "Ligar para o SNS 24",
            wrongAnswer: "Ir de imediato ao hospital",
          },
          {
            question: "A gripe sazonal é uma doença contagiosa que aparece:",
            rightAnswer: "Maioritariamente entre dezembro e fevereiro",
            wrongAnswer: "Ao longo de todo o ano",
          },
          {
            question: "A gripe é uma infeção provocada por:",
            rightAnswer: "Um vírus",
            wrongAnswer: "Um fungo",
          },
          {
            question:
              "Como é que se tem a certeza se estamos infetados com coronavírus SARS-CoV-2?",
            rightAnswer: "Se tivermos febre ou tosse.",
            wrongAnswer: "Só através de uma análise positiva.",
          },
        ],
      },
      fillTheSpaces: {
        activityName: "Completa",
        activityXP: 30,
        activityQuestions: {
          text: `O tratamento para a infeção por este novo coronavírus é dirigido aos sinais e sintomas que os doentes apresentam e tem como objetivo proporcionar alívio e maior conforto aos doentes. À data, considerando o conhecimento científico atual e as recomendações da OMS , encontram-se em investigação, algumas estratégias terapêuticas apontadas como potenciais candidatos terapêuticos. É recomendado o uso de máscara e o afastamento de 2 metros de distância. Caso seja necessário, a pessoa deverá contactar o SNS24 para ajuda. Os sintomas associados são febre , tosse e falta de ar e o período de confinamento das pessoas infetadas é de 14 dias .`,
          holes: [1, 14, 41, 59, 65, 76, 83, 101],
        },
      },
    };
    const achievements = [
      {
        type: "avatar",
        icon: "../img/a_raposa.png",
        name: "A Raposa",
        level: 0,
      },
      {
        type: "avatar",
        icon: "../img/corredor.png",
        name: "O Corredor",
        level: 15,
      },
      {
        type: "avatar",
        icon: "../img/cuidadoso.png",
        name: "O Cuidadoso",
        level: 20,
      },
      {
        type: "avatar",
        icon: "../img/o_mestre.png",
        name: "O Mestre",
        level: 50,
      },
      {
        type: "avatar",
        icon: "../img/o_artista.png",
        name: "O Artista",
        level: 6,
      },
      {
        type: "avatar",
        icon: "../img/o_batoteiro.png",
        name: "O Batoteiro",
        level: 8,
      },
      {
        type: "avatar",
        icon: "../img/o_musico.png",
        name: "O Músico",
        level: 16,
      },
      {
        type: "avatar",
        icon: "../img/o_sortudo.png",
        name: "O Sortudo",
        level: 60,
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
      sessionStorage.setItem("active", JSON.stringify({ type: "none" }));
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
