import StorageController from "./StorageController.js";

export default class GameController {
  constructor() {
    this.userLogged = JSON.parse(sessionStorage.active);
    this.userList = JSON.parse(localStorage.users);
    this.activities = JSON.parse(localStorage.activities);
    this.storageController = new StorageController();
  }

  updateXP(totalObtained) {
    return {
      ...this.userLogged,
      xp: this.userLogged.xp
        ? this.userLogged.xp + totalObtained
        : totalObtained,
    };
  }

  updateStorage() {
    this.storageController.updateLocalStorage(
      "users",
      JSON.stringify(this.userList)
    );
    this.storageController.updateSessionStorage(
      "active",
      JSON.stringify(this.userLogged)
    );
  }

  finishActivity(activity, counter) {
    console.log("a");
    const activityXP =
      activity == "quiz"
        ? this.activities.quiz.activityXP
        : this.activities.fillTheSpaces.activityXP;
    const totalObtained = activityXP * counter;
    this.userLogged = this.updateXP(totalObtained);
    this.userList.map((user) =>
      user.username === this.userLogged.username ? this.userLogged : user
    );
    this.updateStorage();
  }
}
