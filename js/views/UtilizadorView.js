import UtilizadorController from "../controllers/UtilizadorController.js";

export default class UtilizadorView {
  constructor() {
    this.utilizadorController = new UtilizadorController();
    this.checkLoggedUser();
  }

  checkLoggedUser() {
    this.utilizadorController.checkRoute();
  }
}
