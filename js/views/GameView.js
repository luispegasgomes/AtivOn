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
    this.completaSend.addEventListener("click", () => {
      let counter = 0;
      const tratamento = document.getElementById("completaTratamento");
      const sintomas = document.getElementById("completaSintomas");
      const oms = document.getElementById("completaOMS");
      const mascara = document.getElementById("completaMascara");
      const metros = document.getElementById("completaMetros");
      const sns24 = document.getElementById("completaSNS24");
      const dias = document.getElementById("completaDias");
      const febre = document.getElementById("completaFebre");

      if (tratamento.value == "tratamento") {
        counter += 1;
      }
      if (sintomas.value == "sintomas") {
        counter += 1;
      }
      if (oms.value == "OMS") {
        counter += 1;
      }
      if (mascara.value == "máscara") {
        counter += 1;
      }
      if (metros.value == "metros") {
        counter += 1;
      }
      if (sns24.value == "SNS24") {
        counter += 1;
      }
      if (febre.value == "febre") {
        counter += 1;
      }
      if (dias.value == "dias") {
        counter += 1;
      }
      alert(`Acertou em ${counter} respostas`);

      this.gameController.finishActivity("fillTheSpaces", counter);
      location.href = "./landing_user.html";
    });
  }
}
