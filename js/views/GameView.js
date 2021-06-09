import GameController from "../controllers/GameController.js";

export default class GameView {
  constructor() {
    this.gameNameCompleta = document.getElementById("gameNameCompleta");
    this.gameNameQuizOn = document.getElementById("gameNameQuizOn");
    this.showGamesName();
    this.completaSend = document.getElementById("completaSend");
    this.completaTratamento = document.getElementById("completaTratamento");
    this.completaSintomas = document.getElementById("completaSintomas");
    this.completaOMS = document.getElementById("completaOMS");
    this.completaMascara = document.getElementById("completaMascara");
    this.completaMetros = document.getElementById("completaMetros");
    this.completaSNS24 = document.getElementById("completaSNS24");
    this.completaFebre = document.getElementById("completaFebre");
    this.completaDias = document.getElementById("completaDias");
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

  checkValues() {
    // eventListener de this.completaSend
    // verificar valores dos inputs e somar +1 a cada valor certo
    // no fim tirar comentário da seguinte linha (e meter dentro do eventListener):
    // this.gameController.finishActivity("fillTheSpaces", counter)
  }
}
