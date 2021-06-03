import StorageController from "../controllers/StorageController.js";
import AdminController from "../controllers/AdminController.js";

export default class AdminView {
  constructor() {
    this.users = JSON.parse(localStorage.users);
    this.listTab = document.getElementById("list-tab");
    this.navContent = document.getElementById("nav-tabContent");
    if (this.listTab && this.navContent) {
      this.listUsers();
    }

    // configActivities
    this.activities = JSON.parse(localStorage.activities);
    this.quizNome = document.getElementById("quizNome");
    this.quizXP = document.getElementById("quizXP");
    this.trueOrFalseNome = document.getElementById("trueOrFalseNome");
    this.trueOrFalseXP = document.getElementById("trueOrFalseXP");
    this.configQuiz = document.getElementById("configQuiz");
    this.configTrueOrFalse = document.getElementById("configTrueOrFalse");
    // listActivitiesQuestions
    this.perguntasQuiz = document.getElementById("perguntasQuiz");
    this.perguntasTrueOrFalse = document.getElementById("perguntasTrueOrFalse");
    // addActivityQuestion
    this.addQuiz = document.getElementById("addQuiz");
    this.addTrueOrFalse = document.getElementById("addTrueOrFalse");

    if (this.quizNome) {
      this.configActivities();
      this.listActivitiesQuestions();
      this.addActivityQuestion();
    }

    this.achievements = JSON.parse(localStorage.achievements);
    this.cardsAvatares = document.getElementById("cardsAvatares");
    this.cardsMedalhas = document.getElementById("cardsMedalhas");
    this.addConquista = document.getElementById("addConquista");
    if (this.cardsAvatares) {
      this.listAchievements();
      this.addAchievement();
    }

    this.storageController = new StorageController();
    this.adminController = new AdminController();
  }

  listUsers() {
    let textTab = "";
    let textNav = "";
    for (const user of this.users) {
      if (user.username !== "admin") {
        textTab += `<a
            class="list-group-item list-group-item-action fonteUbuntu"
            id="list-${user.username}-list"
            data-toggle="list"
            href="#list-${user.username}"
            role="tab"
            aria-controls="${user.username}"
            >${user.username}</a
          >`;
        textNav += `<article
          class="tab-pane fade fonteUbuntu"
          id="list-${user.username}"
          role="tabpanel"
          aria-labelledby="list-${user.username}-list"
        >
          <p><b>Nome:</b> ${user.name}</p>
          <p><b>Email:</b> ${user.email}</p>
          <p><b>Data de nascimento:</b> ${user.birthdate}</p>
          <p><b>Género:</b> ${user.gender}</p>
          <button class="btn fundoAmarelo corAzulEscuro font-weight-bold removeUser">Remover</button>
          <button class="btn fundoAmarelo corAzulEscuro font-weight-bold editUser">
          ${user.type == "child" ? "Tornar admin" : "Tirar admin"}
          </button>
          <button class="btn fundoAmarelo corAzulEscuro font-weight-bold blockUser">
          ${user.status == "active" ? "Bloquear" : "Desbloquear"}
          </button>
        </article>`;
      }
    }
    this.listTab.innerHTML = textTab;
    this.navContent.innerHTML = textNav;

    // remove
    const btnsRemove = document.getElementsByClassName("removeUser");
    for (const btn of btnsRemove) {
      const parentId = btn.parentNode.id.split("-")[1];
      btn.addEventListener("click", () => {
        this.adminController.removeUser(parentId, this.users);
        location.reload();
      });
    }

    // edit
    const btnsEdit = document.getElementsByClassName("editUser");
    for (const btn of btnsEdit) {
      const parentId = btn.parentNode.id.split("-")[1];
      btn.addEventListener("click", () => {
        this.adminController.editUser(parentId, this.users);
        location.reload();
      });
    }

    // block
    const btnsBlock = document.getElementsByClassName("blockUser");
    for (const btn of btnsBlock) {
      const parentId = btn.parentNode.id.split("-")[1];
      btn.addEventListener("click", () => {
        this.adminController.blockUser(parentId, this.users);
        location.reload();
      });
    }
  }

  configActivities() {
    this.quizNome.innerHTML = this.activities.quiz.activityName;
    this.quizXP.innerHTML = `${this.activities.quiz.activityXP} XP`;
    this.trueOrFalseNome.innerHTML = this.activities.trueOrFalse.activityName;
    this.trueOrFalseXP.innerHTML = `${this.activities.trueOrFalse.activityXP} XP`;

    this.configQuiz.addEventListener("click", () => {
      const nome = prompt(
        "Novo nome para o quiz",
        this.activities.quiz.activityName
      );
      const exp = prompt(
        "Quantidade de experiência ganha",
        this.activities.quiz.activityXP
      );
      if (nome.trim()) {
        this.activities.quiz.activityName = nome;
      }
      if (exp && typeof exp == "number") {
        this.activities.quiz.activityXP = exp;
      }
      this.storageController.updateLocalStorage(
        "activities",
        JSON.stringify(this.activities)
      );
      location.reload();
    });

    this.configTrueOrFalse.addEventListener("click", () => {
      const nome = prompt(
        "Novo nome para o verdadeiro ou falso",
        this.activities.trueOrFalse.activityName
      );
      const exp = prompt(
        "Quantidade de experiência ganha",
        this.activities.trueOrFalse.activityXP
      );
      if (nome.trim()) {
        this.activities.trueOrFalse.activityName = nome;
      }
      if (exp && typeof exp == "number") {
        this.activities.trueOrFalse.activityXP = exp;
      }
      this.storageController.updateLocalStorage(
        "activities",
        JSON.stringify(this.activities)
      );
      location.reload();
    });
  }

  listActivitiesQuestions() {
    const quizQuestions = this.activities.quiz.activityQuestions;
    const trueOrFalseQuestions = this.activities.trueOrFalse.activityQuestions;
    let quiz = "";
    let trueOrFalse = "";
    for (const quizQuestion of quizQuestions) {
      quiz += `<div class="card card-body">
          <p><b class="corLaranja">Pergunta: </b>
          <span>${quizQuestion.question}</span></p>
          <p class="pl-2"><b class="corLaranja">Resposta certa: </b>${quizQuestion.rightAnswer}</p>
          <p class="pl-2"><b class="corLaranja">Resposta errada: </b>${quizQuestion.wrongAnswer}</p>
          <button class="btn btn-danger removerQuiz">Remover pergunta</button>
        </div>`;
    }
    for (const trueOrFalseQuestion of trueOrFalseQuestions) {
      trueOrFalse += `<div class="card card-body">
            <p><b class="corLaranja">Pergunta: </b>
            <span>${trueOrFalseQuestion.question}</span></p>
            <p class="pl-2 ${
              trueOrFalseQuestion.type !== "Falso"
                ? "text-sucess"
                : "text-danger"
            }">${trueOrFalseQuestion.type}</p>
            <button class="btn btn-danger removerTrueOrFalse">Remover pergunta</button>
          </div>`;
    }
    this.perguntasQuiz.innerHTML = quiz;
    this.perguntasTrueOrFalse.innerHTML = trueOrFalse;

    const quizBtns = document.getElementsByClassName("removerQuiz");
    for (const quizBtn of quizBtns) {
      quizBtn.addEventListener("click", () => {
        const pergunta = String(
          quizBtn.parentNode.querySelector("p span").innerHTML
        );
        this.adminController.removeActivityQuestion("quiz", pergunta);
        location.reload();
      });
    }

    const trueOrFalseBtns =
      document.getElementsByClassName("removerTrueOrFalse");
    for (const trueOrFalseBtn of trueOrFalseBtns) {
      trueOrFalseBtn.addEventListener("click", () => {
        const pergunta = String(
          trueOrFalseBtn.parentNode.querySelector("p span").innerHTML
        );
        this.adminController.removeActivityQuestion("trueOrFalse", pergunta);
        location.reload();
      });
    }
  }

  addActivityQuestion() {
    this.addQuiz.addEventListener("click", () => {
      const question = prompt("Pergunta").trim();
      const rightAnswer = prompt("Resposta Certa").trim();
      const wrongAnswer = prompt("Resposta Errada").trim();

      if (question && rightAnswer && wrongAnswer) {
        this.adminController.addActivityQuestion("quiz", {
          question,
          rightAnswer,
          wrongAnswer,
        });
      } else {
        alert("Alguma coisa deu errado ao adicionar a pergunta");
      }
    });

    this.addTrueOrFalse.addEventListener("click", () => {
      const question = prompt("Pergunta").trim();
      const type = prompt("Tipo (Verdadeiro/Falso)").trim();
      if (question && (type === "Verdadeiro" || type === "Falso")) {
        this.adminController.addActivityQuestion("trueOrFalse", {
          question,
          type,
        });
      } else {
        alert("Alguma coisa deu errado ao adicionar a pergunta");
      }
    });
  }

  achievementCard(icon, name, description) {
    return `<div class="col-sm-3">
    <div class="card">
      <div class="card-body">
        <img
          class="card-img-top"
          src="${icon}"
          alt="${name}"
          height="200" width="200"
        />
        <h5 class="card-title text-center my-2">${name}</h5>
        <p class="card-text">${description}</p>
        <button class="btn btn-danger removerConquista">Remover</button>
      </div>
    </div>
  </div>`;
  }

  listAchievements() {
    let listAvatars = "";
    let listMedals = "";
    for (const achievement of this.achievements) {
      if (achievement.type === "avatar") {
        listAvatars += this.achievementCard(
          achievement.icon,
          achievement.name,
          achievement.description
        );
      } else {
        listMedals += this.achievementCard(
          achievement.icon,
          achievement.name,
          achievement.description
        );
      }
    }
    this.cardsAvatares.innerHTML = listAvatars
      ? listAvatars
      : "<p><i>Não existem avatares.</i></p>";
    this.cardsMedalhas.innerHTML = listMedals
      ? listMedals
      : "<p><i>Não existem medalhas.</i></p>";

    const achievementsBtns =
      document.getElementsByClassName("removerConquista");

    for (const achievementsBtn of achievementsBtns) {
      achievementsBtn.addEventListener("click", () => {
        const name = achievementsBtn.parentNode.querySelector("h5").innerHTML;
        const newAchievements = this.achievements.filter(
          (achievement) => achievement.name !== name
        );
        this.storageController.updateLocalStorage(
          "achievements",
          JSON.stringify(newAchievements)
        );
        location.reload();
      });
    }
  }

  addAchievement() {
    this.addConquista.addEventListener("click", () => {
      const type = prompt("Tipo (avatar/medalha)");
      const name = prompt("Nome");
      const icon = prompt("Icon");
      const description = prompt("Descrição");

      if (
        (type === "avatar" || type === "medal") &&
        !this.achievements.some(
          (achievement) =>
            achievement.name === name || achievement.icon === icon
        )
      ) {
        this.achievements.push({ type, icon, name, description });
        this.storageController.updateLocalStorage(
          "achievements",
          JSON.stringify(this.achievements)
        );
        location.reload();
      } else {
        alert("Algum valor foi inválido");
      }
    });
  }
}
