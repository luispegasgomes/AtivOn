import AchievementsController from "../controllers/AchievementsController.js";

export default class AchievementView {
  constructor() {
    this.achievementsController = new AchievementsController();
    this.navMedals = document.getElementById("nav-medals");
    this.navAvatars = document.getElementById("nav-avatars");
    this.selAchievementImg = document.getElementById("selAchievementImg");
    this.selAchievementName = document.getElementById("selAchievementName");
    this.selAchievementDesc = document.getElementById("selAchievementDesc");
    this.listAchievements();
  }

  listAchievements() {
    const items = this.achievementsController.getAchievements();
    let medalsItems = "";
    let avatarsItems = "";
    for (const achievement of items) {
      if (achievement.type == "avatar") {
        avatarsItems += this.getBtn(achievement);
      } else {
        medalsItems += this.getBtn(achievement);
      }
    }

    this.navMedals.innerHTML = medalsItems
      ? medalsItems
      : "Não existem medalhas disponíveis.";
    this.navAvatars.innerHTML = avatarsItems
      ? avatarsItems
      : "Não existem avatares disponíveis.";

    const btns = document.getElementsByClassName("achievementBtn");

    for (const btn of btns) {
      btn.addEventListener("click", () => {
        const achievementName = btn.childNodes[1].alt;
        const result =
          this.achievementsController.getAchievementByName(achievementName);
        this.selAchievementImg.src = result.icon;
        this.selAchievementImg.alt = result.name;
        this.selAchievementName.innerHTML = result.name;
        this.selAchievementDesc.innerHTML = `Conseguiste a medalha no nível ${result.level}`;
      });
    }
  }

  getBtn(achievement) {
    return achievement.isEnabled
      ? `<button class="btn achievementBtn m-2">
            <img src="${achievement.icon}" alt="${achievement.name}" style="width:50px">
        </button>`
      : `<button class="btn achievementBtn m-2" disabled>
            <img src="${achievement.icon}" alt="${achievement.name}" style="width:50px">
        </button>`;
  }
}
