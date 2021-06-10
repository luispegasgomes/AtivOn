import UserController from "../controllers/UserController.js";
import StorageController from "../controllers/StorageController.js";
import TrophyController from "../controllers/TrophyController.js";

export default class TrophyView {
  constructor() {
    this.userController = new UserController();
    this.avatars = document.getElementsByClassName('avatar').value
    this.oldAvatar = document.getElementById('oldAvatar').value
    this.TrophyController = new TrophyController();
    this.storageController = new StorageController();
    this.showNewProfileImage()
  }
  
  showNewProfileImage () {
    // Check Level
    const userInfo = JSON.parse(sessionStorage.getItem("active"));
    const level = Math.trunc(userInfo.xp / 100)
    console.log(userInfo.xp);
    
    if (this.level >= 0 || this.level >= 6) {
      this.oldAvatar.innerHtml = `<img id="oldAvatar" src="../img/a_raposa.png" width="180px" />`

    } else if (this.level > 6 || this.level >= 8) {
      this.oldAvatar.innerHtml = `<img id="oldAvatar" src="../img/o_batoteiro.png" width="180px" />`
    }
    
  }

}
