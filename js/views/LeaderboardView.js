import LeaderboardController from "../controllers/LeaderboardController.js";

export default class LeaderboardView {
  constructor() {
    this.leaderboardController = new LeaderboardController();
    // landing
    this.leaderboardPosition = document.getElementById("leaderboardPosition");
    if (this.leaderboardPosition) {
      this.getUserPosition(JSON.parse(sessionStorage.active).username);
    }
    // leaderboard
    this.top1Username = document.getElementById("top1Username");
    this.top1UserXP = document.getElementById("top1UserXP");
    this.leaderboardTable = document.getElementById("leaderboardTable");
    this.leaderboardOrder = this.leaderboardController.orderUsers();
    if (this.top1Username) {
      this.showTop1User();
      this.showLeaderboard();
    }
  }

  getUserPosition(username) {
    const position =
      this.leaderboardOrder.findIndex((user) => user.username == username) + 1;
    this.leaderboardPosition.innerHTML = position;
  }

  showTop1User() {
    const top1 = this.leaderboardOrder[0];
    this.top1Username.innerHTML = top1.username;
    this.top1UserXP.innerHTML = top1.xp ? `${top1.xp} XP` : "0 XP";
  }

  showLeaderboard() {
    const leaderboard = this.leaderboardOrder;
    const maxSize = leaderboard.length <= 10 ? leaderboard.length : 10;
    let leaderboardList = "";
    for (let index = 0; index < maxSize; index++) {
      const user = leaderboard[index];
      leaderboardList +=
        index == 0
          ? `<article class="fundoAmarelo col-12 my-1 d-flex">
                <p class="col-2 text-center"><b>${index + 1}</b></p>
                <p class="col-6"><b>${user.username}</b></p>
                <p class="col-4"><b>${user.xp ? user.xp : 0} XP</b></p>
            </article>`
          : `<article class="col-12 my-1 d-flex">
                <p class="col-2 text-center">${index + 1}</p>
                <p class="col-6">${user.username}</p>
                <p class="col-4">${user.xp ? user.xp : 0} XP</p>
            </article>`;
    }
    this.leaderboardTable.innerHTML = leaderboardList;
  }
}
