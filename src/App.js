const { Console } = require("@woowacourse/mission-utils");
const Coach = require("./Coach");
const { NEW_LINE, MESSAGE, RESULT } = require("./Constant");
const { readCoachName, readCoachPickyFoods } = require("./InputView");
const { print, printResult } = require("./OutputView");
const { getMenu, getFood } = require("./RandomMachine");
const {
  validateCoachNumber,
  validateNameLength,
  validatePickyFoods,
} = require("./Validation");

class App {
  #coaches = [];
  #categories = [];

  getCoachName() {
    readCoachName(this.actWithCoachName.bind(this));
  }

  actWithCoachName(nameInput) {
    const names = nameInput.split(",").map((name) => name.trim());
    try {
      validateCoachNumber(names);
      this.makeEachCoachField(names);
      this.getPickyFoods(0);
    } catch (e) {
      print(e);
      this.getCoachName();
    }
  }

  makeEachCoachField(names) {
    names.forEach((name, ind) => {
      try {
        validateNameLength(name);
        this.#coaches.push(new Coach(name, ind));
      } catch (e) {
        print(e);
        this.getCoachName();
      }
    });
  }

  getPickyFoods(i) {
    if (i === this.#coaches.length) {
      this.endGame();
      return;
    }

    readCoachPickyFoods(this.#coaches[i], this.actWithPickyFoods.bind(this));
  }

  actWithPickyFoods(coach, foods) {
    const pickyFoods = foods.split(",").map((food) => food.trim());
    try {
      validatePickyFoods(pickyFoods);
      coach.setPickyFoods(pickyFoods);
      this.recommandFoods(coach);
      this.getPickyFoods(coach.getNumber() + 1);
    } catch (e) {
      print(e);
      this.getPickyFoods(coach);
    }
  }

  setCategories() {
    while (this.#categories.length < 5) {
      this.setCategoryOfDay();
    }
  }

  setCategoryOfDay() {
    const categoryOfDay = getMenu();
    const numberOfCategory = this.#categories.filter(
      (category) => category === categoryOfDay
    ).length;

    if (numberOfCategory < 2) {
      this.#categories.push(categoryOfDay);
    }
  }

  recommandFoods(coach) {
    while (coach.getMenuLength() < 5) {
      this.getOnlyFood(coach);
    }
  }

  getOnlyFood(coach) {
    const menu = coach.getMenuLength();
    const food = getFood(this.#categories[menu]);
    if (coach.compareFood(food)) {
      coach.addFoodtoMenu(food);
    }
  }

  getResultLines() {
    return this.#coaches.map((coach) => coach.getResult()).join(NEW_LINE);
  }

  endGame() {
    const resultLines = this.getResultLines();
    const categories = `[ 카테고리 | ${this.#categories.join(
      RESULT.divider
    )} ]`;
    printResult(resultLines, categories);
    Console.close();
  }

  play() {
    print(MESSAGE.start);
    this.setCategories();
    this.getCoachName();
  }
}

new App().play();

module.exports = App;
