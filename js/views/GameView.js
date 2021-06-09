import GameController from "../controllers/GameController.js";

export default class GameView {
  constructor() {
    this.gameNameCompleta = document.getElementById("gameNameCompleta");
    this.gameNameQuizOn = document.getElementById("gameNameQuizOn");
    this.showGamesName();
    this.textCompleta = document.getElementById("textCompleta");
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
    for (let i = 0; i < arrText.length; i++) {
      if (question.holes.includes(i)) {
        text += `<input type="text" class="completaInput"> `;
      } else {
        text += arrText[i] + " ";
      }
    }

    this.textCompleta.innerHTML = `<p>${text}</p>`;
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
        confirmButtonText:
          '<a href="./landing_user.html">Volta para o início!</a>',
      });
      //location.href = "./landing_user.html";
    });
  }
}
