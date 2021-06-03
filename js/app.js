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
        type: "admin",
        status: "active",
      },
      {
        name: "user",
        username: "user",
        email: "user@gmail.com",
        password: "password",
        birthdate: "2000-02-10",
        gender: "M",
        type: "child",
        status: "active",
      },
    ];
    const activities = {
      quiz: {
        activityName: "QuizOn",
        activityXP: 300,
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
      trueOrFalse: {
        activityName: "CurioAtiv",
        activityXP: 100,
        activityQuestions: [
          {
            question:
              "Se sentir sintomas associados à COVID-19, como febre, tosse, cansaço e por vezes perda de olfato e/ou de paladar devo ficar em casa em «isolamento» e ligar para o SNS24.",
            type: "Verdadeiro",
          },
          {
            question:
              "O coronavírus transmite-se de pessoa-a-pessoa por contacto próximo com pessoas infetadas pelo SARS-CoV-2 (transmissão direta), ou através do contacto com superfícies e objetos contaminados (transmissão indireta).",
            type: "Verdadeiro",
          },
          {
            question: "As vacinas contra a COVID-19 não podem causar doença.",
            type: "Verdadeiro",
          },
          {
            question:
              "Lavar as mãos frequentemente é uma prática que nos ajuda a proteger contra a COVID-19 e outras doenças ou microrganismos.",
            type: "Verdadeiro",
          },
          {
            question: "A vacina contra a COVID-19 é obrigatória.",
            type: "Falso",
          },
          {
            question: "Este vírus (o SARS-CoV-2) é o mais grave que se conhece",
            type: "Falso",
          },
          {
            question:
              "As vacinas contra a COVID-19 são seguras para utilização nos adultos.",
            type: "Verdadeiro",
          },
          {
            question:
              "Os vírus são pequenos agentes infeciosos responsáveis por muitas e diferentes doenças, e só são visíveis através de microscópios potentes.",
            type: "Verdadeiro",
          },
          {
            question:
              "Os investigadores ainda não começaram a investigar o tratamento para a COVID-19.",
            type: "Falso",
          },
          {
            question: "Os antibióticos existem para combater vírus",
            type: "Falso",
          },
          {
            question:
              "A vacina da gripe sazonal também ajuda a evitar a COVID-19",
            type: "Falso",
          },
          {
            question: "Quem já foi vacinado não precisa de utilizar máscara",
            type: "Falso",
          },
          {
            question:
              "Os vírus, na sua maioria, são resistentes e não morrem se forem refrigerados ou mesmo congelados",
            type: "Verdadeiro",
          },
          {
            question:
              "Coronavírus é uma família de vírus, onde se encontra este novo vírus, o SARS-CoV-2, que pode provocar a doença designada COVID-19",
            type: "Verdadeiro",
          },
          {
            question:
              "Podemos apanhar vírus ou bactérias em alimentos crus ou mal cozinhados",
            type: "Verdadeiro",
          },
          {
            question:
              "Os coronavírus são compostos por um núcleo de material genético rodeado por um envelope de picos de proteínas, o que lhe dá a aparência de uma coroa. É esta a razão para a sua denominação",
            type: "Verdadeiro",
          },
        ],
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
