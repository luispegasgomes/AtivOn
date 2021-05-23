export default class ListingView {
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

    this.listMedals();
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
        </article>`;
      }
    }
    this.listTab.innerHTML = textTab;
    this.navContent.innerHTML = textNav;

    const btns = document.getElementsByClassName("removeUser");
    for (const btn of btns) {
      const parentId = btn.parentNode.id.split("-")[1];
      btn.addEventListener("click", () => {
        const newList = this.users.filter((user) => user.username != parentId);
        localStorage.setItem("users", JSON.stringify(newList));
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
      if (nome) {
        this.activities.quiz.activityName = nome;
      }
      if (exp) {
        this.activities.quiz.activityXP = exp;
      }
      localStorage.setItem("activities", JSON.stringify(this.activities));
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
      if (nome) {
        this.activities.trueOrFalse.activityName = nome;
      }
      if (exp) {
        this.activities.trueOrFalse.activityXP = exp;
      }
      localStorage.setItem("activities", JSON.stringify(this.activities));
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
        const list = this.activities.quiz.activityQuestions.filter(
          (q) => q.question != pergunta
        );
        this.activities.quiz.activityQuestions = list;
        localStorage.setItem("activities", JSON.stringify(this.activities));
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
        const list = this.activities.trueOrFalse.activityQuestions.filter(
          (q) => q.question != pergunta
        );
        this.activities.trueOrFalse.activityQuestions = list;
        localStorage.setItem("activities", JSON.stringify(this.activities));
        console.log(localStorage.activities);
        location.reload();
      });
    }
  }

  addActivityQuestion() {
    this.addQuiz.addEventListener("click", () => {
      const question = prompt("Pergunta");
      const rightAnswer = prompt("Resposta Certa");
      const wrongAnswer = prompt("Resposta Errada");

      if (question && rightAnswer && wrongAnswer) {
        if (
          !this.activities.quiz.activityQuestions.some(
            (q) => q.question === question
          )
        ) {
          this.activities.quiz.activityQuestions.push({
            question,
            rightAnswer,
            wrongAnswer,
          });
          localStorage.setItem("activities", JSON.stringify(this.activities));
          location.reload();
        } else {
          alert("Pergunta já existente");
        }
      } else {
        alert("Alguma coisa deu errado ao adicionar a pergunta");
      }
    });

    this.addTrueOrFalse.addEventListener("click", () => {
      const question = prompt("Pergunta");
      const type = prompt("Tipo (Verdadeiro/Falso)");
      if (question && (type === "Verdadeiro" || type === "Falso")) {
        if (
          !this.activities.trueOrFalse.activityQuestions.some(
            (q) => q.question === question
          )
        ) {
          this.activities.quiz.activityQuestions.push({
            question,
            type,
          });
          localStorage.setItem("activities", JSON.stringify(this.activities));
          location.reload();
        } else {
          alert("Pergunta já existente");
        }
      } else {
        alert("Alguma coisa deu errado ao adicionar a pergunta");
      }
    });
  }

  listMedals() {}
}
