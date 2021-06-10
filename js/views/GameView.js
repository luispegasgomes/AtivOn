import GameController from "../controllers/GameController.js";

export default class GameView {
  constructor() {
    this.gameNameCompleta = document.getElementById("gameNameCompleta");
    this.gameNameQuizOn = document.getElementById("gameNameQuizOn");
    this.showGamesName();
    this.textCompleta = document.getElementById("textCompleta");
    this.wordsCompleta = document.getElementById("wordsCompleta");
    if (this.textCompleta) {
      this.printText();
    }
    this.completaSend = document.getElementById("completaSend");
    if (this.completaSend) {
      this.checkValues();
    }
    this.gameController = new GameController();
  }

  showGamesName() {
    const gameInfo = JSON.parse(localStorage.getItem("activities"));
    if (this.gameNameCompleta) {
      this.gameNameCompleta.innerHTML = gameInfo.fillTheSpaces.activityName;
    }
    if (this.gameNameQuizOn) {
      this.gameNameQuizOn.innerHTML = gameInfo.quiz.activityName;
    }
  }

  printText() {
    const question = JSON.parse(localStorage.getItem("activities"))
      .fillTheSpaces.activityQuestions;
    const arrText = question.text.split(" ");
    let text = "";
    let words = [];
    for (let i = 0; i < arrText.length; i++) {
      if (question.holes.includes(i)) {
        text += `<input type="text" class="completaInput"> `;
        words.push(arrText[i]);
      } else {
        text += arrText[i] + " ";
      }
    }

    words = words.sort((a, b) => 0.5 - Math.random()).join(" ");

    this.textCompleta.innerHTML = `<p>${text}</p>`;
    this.wordsCompleta.innerHTML = `<p>${words}</p>`;
  }

  checkValues() {
    this.completaSend.addEventListener("click", () => {
      const inputs = document.getElementsByClassName("completaInput");
      const fillTheSpaces = JSON.parse(
        localStorage.getItem("activities")
      ).fillTheSpaces;
      const arrText = fillTheSpaces.activityQuestions.text.split(" ");
      let counter = 0;
      for (let i = 0; i < inputs.length; i++) {
        const text = arrText[fillTheSpaces.activityQuestions.holes[i]];
        if (inputs[i].value == text) {
          counter += 1;
        }
        inputs[i].value = "";
      }
      this.gameController.finishActivity("fillTheSpaces", counter);
      Swal.fire({
        imageUrl: "../img/Troféu_ico.png",
        imageWidth: 200,
        imageHeight: 200,
        title: "Completa!",
        html: `Acertaste ${counter} espaços, acumulaste mais ${
          counter * fillTheSpaces.activityXP
        } XP.`,
        confirmButtonColor: "#8ecae6",
        confirmButtonText: "Volta para o início!",
      }).then((result) => {
        if (result.value) {
          window.location.href = `./landing_user.html`;
        }
      });
    });
  }
}
