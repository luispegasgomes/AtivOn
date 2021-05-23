export default class AchievementModel {
  constructor(type, icon, name, achieve) {
    this.type = type; // medal / avatar
    this.icon = icon;
    this.name = name;
    this.achieve = achieve;
  }
}