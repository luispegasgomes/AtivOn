export default class AchievementsController {
  constructor() {
    this.achievementsList = JSON.parse(localStorage.achievements);
  }

  getAchievements() {
    const userInfo = JSON.parse(sessionStorage.active);
    const level = userInfo.xp ? Math.trunc(userInfo.xp / 100) : 0;
    return this.achievementsList
      .map((a) => ({
        ...a,
        isEnabled: a.level <= level,
      }))
      .sort((a, b) => a.level - b.level);
  }

  getAchievementByName(name) {
    return this.achievementsList.find((a) => a.name == name);
  }
}
