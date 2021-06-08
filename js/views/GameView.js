import UserController from "../controllers/UserController.js";
import StorageController from "../controllers/StorageController.js";

export default class GameView {
  constructor() {
    this.userController = new UserController();
    this.gameNameCompleta = document.getElementById("gameNameCompleta");
    this.gameNameQuizOn = document.getElementById("gameNameQuizOn");
    this.showGamesName();

    this.storageController = new StorageController();
  }

  showGamesName() {
    const gameInfo = JSON.parse(localStorage.getItem("activities"));
    this.gameNameCompleta.innerHTML = gameInfo.fillTheSpaces.activityName;
    this.gameNameQuizOn.innerHTML = gameInfo.quiz.activityName;

  }

  
}
