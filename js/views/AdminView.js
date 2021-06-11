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
    this.fillSpacesNome = document.getElementById("fillSpacesNome");
    this.fillSpacesXP = document.getElementById("fillSpacesXP");
    this.configQuiz = document.getElementById("configQuiz");
    this.configFillSpaces = document.getElementById("configFillSpaces");
    // listActivitiesQuestions
    this.perguntasQuiz = document.getElementById("perguntasQuiz");
    this.infoFillSpaces = document.getElementById("infoFillSpaces");
    // addActivityQuestion
    this.addQuiz = document.getElementById("addQuiz");
    this.formFillSpaces = document.getElementById("formFillSpaces");
    if (this.quizNome) {
      this.configActivities();
      this.listQuizQuestions();
      this.addQuizQuestion();
      this.showFillTheSpacesText();
      this.alterFillTheSpacesText();
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
    this.fillSpacesNome.innerHTML = this.activities.fillTheSpaces.activityName;
    this.fillSpacesXP.innerHTML = `${this.activities.fillTheSpaces.activityXP} XP`;

    this.configQuiz.addEventListener("click", () => {
      const nome = prompt(
        "Novo nome para o quiz",
        this.activities.quiz.activityName
      );
      console.log(nome);
      const exp = prompt(
        "Quantidade de experiência ganha",
        this.activities.quiz.activityXP
      );
      if (nome.trim()) {
        this.activities.quiz.activityName = nome;
      }
      if (exp) {
        this.activities.quiz.activityXP = Number(exp);
      }
      this.storageController.updateLocalStorage(
        "activities",
        JSON.stringify(this.activities)
      );
      location.reload();
    });

    this.configFillSpaces.addEventListener("click", () => {
      const nome = prompt(
        "Novo nome para o completar os espaços",
        this.activities.fillTheSpaces.activityName
      );
      const exp = prompt(
        "Quantidade de experiência ganha",
        this.activities.fillTheSpaces.activityXP
      );
      if (nome.trim()) {
        this.activities.fillTheSpaces.activityName = nome;
      }
      if (exp) {
        this.activities.fillTheSpaces.activityXP = Number(exp);
      }
      this.storageController.updateLocalStorage(
        "activities",
        JSON.stringify(this.activities)
      );
      location.reload();
    });
  }

  listQuizQuestions() {
    const quizQuestions = this.activities.quiz.activityQuestions;
    let quiz = "";
    for (const quizQuestion of quizQuestions) {
      quiz += `<div class="card card-body fonteUbuntu">
          <p><b class="corLaranja">Pergunta: </b>
          <span>${quizQuestion.question}</span></p>
          <p class="pl-2"><b class="corLaranja">Resposta certa: </b>${quizQuestion.rightAnswer}</p>
          <p class="pl-2"><b class="corLaranja">Resposta errada: </b>${quizQuestion.wrongAnswer}</p>
          <button class="btn btn-danger removerQuiz">Remover pergunta</button>
        </div>`;
    }
    this.perguntasQuiz.innerHTML = quiz;

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
  }

  addQuizQuestion() {
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
        location.reload();
      } else {
        alert("Alguma coisa deu errado ao adicionar a pergunta");
      }
    });
  }

  showFillTheSpacesText() {
    const fillSpacesGame = this.activities.fillTheSpaces.activityQuestions;
    const arrText = fillSpacesGame.text.split(" ");
    let fillSpacesText = "";
    for (let index = 0; index < arrText.length; index++) {
      if (fillSpacesGame.holes.includes(index)) {
        fillSpacesText += `<b>${arrText[index]}</b> `;
      } else {
        fillSpacesText += `${arrText[index]} `;
      }
    }
    this.infoFillSpaces.innerHTML = `<p class="fonteUbuntu">${fillSpacesText}</p>`;
  }

  alterFillTheSpacesText() {
    this.formFillSpaces.addEventListener("submit", (e) => {
      e.preventDefault();
      let text = document.getElementById("newText").value;
      let holes = document.getElementById("newHoles").value;
      if (text && holes) {
        holes = holes.split(" ").map((n) => Number(n) - 1);
        this.adminController.addActivityQuestion("fillTheSpaces", {
          text,
          holes,
        });
      } else {
        alert("Não preencheu os formulário todo");
      }
      text = "";
      holes = "";
      location.reload();
    });
  }

  achievementCard(icon, name, level) {
    return `<div class="col-sm-3 mb-2">
    <div class="card">
      <div class="card-body">
        <img
          class="card-img-top"
          src="${icon}"
          alt="${name}" 
        />
        <h5 class="card-title text-center my-2">${name}</h5>
        <p class="card-text">Atingir o nível ${level}</p>
        <button class="btn btn-danger removerConquista">Remover</button>
      </div>
    </div>
  </div>`;
  }

  listAchievements() {
    let listAvatars = "";
    let listMedals = "";
    this.achievements = this.achievements.sort((a, b) => a.level - b.level);
    for (const achievement of this.achievements) {
      if (achievement.type === "avatar") {
        listAvatars += this.achievementCard(
          achievement.icon,
          achievement.name,
          achievement.level
        );
      } else {
        listMedals += this.achievementCard(
          achievement.icon,
          achievement.name,
          achievement.level
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
      const level = prompt("Nível a atingir");

      if (
        (type === "avatar" || type === "medal") &&
        !this.achievements.some(
          (achievement) =>
            achievement.name === name || achievement.icon === icon
        )
      ) {
        this.achievements.push({ type, icon, name, level: Number(level) });
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
