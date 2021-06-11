export default class LeaderboardController {
  constructor() {
    this.allChildUsers = JSON.parse(localStorage.users).filter(
      (u) => u.type == "child"
    );
  }

  orderUsers() {
    return this.allChildUsers
      .sort((a, b) => {
        const aXP = a.xp ? a.xp : 0;
        const bXP = b.xp ? b.xp : 0;
        return aXP - bXP;
      })
      .reverse();
  }
}
