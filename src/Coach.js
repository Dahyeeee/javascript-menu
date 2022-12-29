const { RESULT } = require("./Constant");

class Coach {
  #name;
  #pickyFoods;
  #menus = [];

  constructor(name) {
    this.#name = name;
  }

  getName() {
    return this.#name;
  }

  setPickyFoods(pickyFoods) {
    this.#pickyFoods = pickyFoods;
  }

  isFoodRecommandable(foodOfToday) {
    if (this.#menus.includes(foodOfToday)) {
      return false;
    }

    if (this.#pickyFoods.includes(foodOfToday)) {
      return false;
    }

    return true;
  }

  addFoodtoMenu(food) {
    this.#menus.push(food);
  }

  getMenuLength() {
    return this.#menus.length;
  }

  getResult() {
    return `[ ${this.#name} | ${this.#menus.join(RESULT.divider)} ]`;
  }
}

module.exports = Coach;
