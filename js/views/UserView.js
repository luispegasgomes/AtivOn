import UserController from "../controllers/UtilizadorController.js";

export default class UserView {
  constructor() {
    this.userController = new UserController();
    this.checkLoggedUser();
  }

  checkLoggedUser() {
    this.userController.checkRoute();
  }
}
