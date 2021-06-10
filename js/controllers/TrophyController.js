import StorageController from "./StorageController.js";

export default class TrophyController {
  constructor() {
    this.userLogged = JSON.parse(sessionStorage.active);
    this.achievements = JSON.parse(localStorage.achievements);
    this.storageController = new StorageController();
  }

}