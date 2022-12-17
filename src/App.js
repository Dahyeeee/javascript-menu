const { Console } = require("@woowacourse/mission-utils");
const Coach = require("./Coach");
const { NEW_LINE, MESSAGE } = require("./Constant");
const { CATEGORY } = require("./data");
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

  getCoachName() {
    readCoachName(this.actWithCoachName.bind(this));
  }

  actWithCoachName(nameInput) {
    const names = nameInput.split(",");
    console.log(names);
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
      while (coach.getMenuLength() < 5) {
        this.recommandFoods(coach);
      }
    } catch (e) {
      print(e);
      this.getPickyFoods(coach);
    }
    this.getPickyFoods(coach.getNumber() + 1);
  }

  recommandFoods(coach) {
    const category = getMenu();
    if (coach.compareCategory(category)) {
      const food = getFood(category);
      if (coach.compareFood(food)) {
        coach.addFoodtoMenu(category, food);
      }
    }
  }

  getResultLines() {
    return this.#coaches.map((coach) => coach.getResult()).join(NEW_LINE);
  }

  endGame() {
    const resultLines = this.getResultLines();
    printResult(resultLines);
    Console.close();
  }

  play() {
    print(MESSAGE.start);
    this.getCoachName();
  }
}

new App().play();
module.exports = App;
