import StorageController from "./StorageController.js";

export default class GameController {
  constructor() {
    this.userLogged = JSON.parse(sessionStorage.active);
    this.userList = JSON.parse(localStorage.users);
    this.activities = JSON.parse(localStorage.activities);
    this.storageController = new StorageController();
  }

  finishActivity(activity, counter) {
    console.log("a");
    const activityXP =
      activity == "quiz"
        ? this.activities.quiz.activityXP
        : this.activities.fillTheSpaces.activityXP;
    const totalObtained = activityXP * counter;
    this.userLogged = {
      ...this.userLogged,
      xp: this.userLogged.xp
        ? this.userLogged.xp + totalObtained
        : totalObtained,
    };
    const newList = this.userList.map((user) =>
      user.username === this.userLogged.username ? this.userLogged : user
    );
    this.storageController.updateLocalStorage("users", JSON.stringify(newList));
    this.storageController.updateSessionStorage(
      "active",
      JSON.stringify(this.userLogged)
    );
  }
}
