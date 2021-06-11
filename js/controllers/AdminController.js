import StorageController from "./StorageController.js";

export default class AdminController {
  constructor() {
    this.storageController = new StorageController();
    this.activities = localStorage.activities
      ? JSON.parse(localStorage.activities)
      : [];
  }

  removeUser(parentId, userList) {
    const newList = userList.filter((user) => user.username != parentId);
    this.storageController.updateLocalStorage("users", JSON.stringify(newList));
  }

  editUser(parentId, userList) {
    const newList = [];
    for (const user of userList) {
      if (user.username == parentId) {
        newList.push({
          ...user,
          type: user.type == "admin" ? "child" : "admin",
        });
      } else {
        newList.push(user);
      }
    }
    this.storageController.updateLocalStorage("users", JSON.stringify(newList));
  }

  blockUser(parentId, userList) {
    const newList = [];
    for (const user of userList) {
      if (user.username == parentId) {
        newList.push({
          ...user,
          status: user.status == "active" ? "blocked" : "active",
        });
      } else {
        newList.push(user);
      }
    }
    this.storageController.updateLocalStorage("users", JSON.stringify(newList));
  }

  addActivityQuestion(activity, item) {
    if (activity == "quiz") {
      if (
        !this.activities.quiz.activityQuestions.some(
          (q) => q.question === item.question
        )
      ) {
        this.activities.quiz.activityQuestions.push(item);
        this.storageController.updateLocalStorage(
          "activities",
          JSON.stringify(this.activities)
        );
      } else {
        alert("Pergunta já existente");
      }
    } else if (activity == "fillTheSpaces") {
      this.activities.fillTheSpaces.activityQuestions = item;
      this.storageController.updateLocalStorage(
        "activities",
        JSON.stringify(this.activities)
      );
    }
  }

  removeActivityQuestion(activity, question) {
    if (activity == "quiz") {
      const list = this.activities.quiz.activityQuestions.filter(
        (q) => q.question != question
      );
      this.activities.quiz.activityQuestions = list;
      this.storageController.updateLocalStorage(
        "activities",
        JSON.stringify(this.activities)
      );
    }
  }
}
