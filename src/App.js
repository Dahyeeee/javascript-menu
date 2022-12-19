const { Console } = require("@woowacourse/mission-utils");
const Category = require("./Category");
const Coach = require("./Coach");
const { NEW_LINE, MESSAGE, RESULT } = require("./Constant");
const { readCoachName, readCoachPickyFoods } = require("./InputView");
const { print, printResult } = require("./OutputView");
const { getFood } = require("./RandomMachine");
const {
  validateCoachNumber,
  validatePickyFoods,
  validateNamesLength,
} = require("./Validation");

class App {
  #coaches = [];
  #category;

  play() {
    print(MESSAGE.start);
    this.#category = new Category(5, 2);
    this.getCoachName();
  }

  getCoachName() {
    readCoachName(this.actWithCoachName.bind(this));
  }

  actWithCoachName(nameInput) {
    const names = nameInput.split(",").map((name) => name.trim());
    try {
      validateCoachNumber(names);
      validateNamesLength(names);
      this.makeEachCoachField(names);
      this.getPickyFoods(0);
    } catch (e) {
      print(e);
      this.getCoachName();
    }
  }

  makeEachCoachField(names) {
    names.forEach((name, ind) => {
      this.#coaches.push(new Coach(name, ind));
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
      this.getPickyFoods(coach.getNumber());
    }
  }

  recommandFoods(coach) {
    while (coach.getMenuLength() < 5) {
      this.recommandFood(coach);
    }
  }

  recommandFood(coach) {
    const day = coach.getMenuLength();
    const food = getFood(this.#category.getCategoryOfDay(day));
    if (coach.isFoodRecommandable(food)) {
      coach.addFoodtoMenu(food);
    }
  }

  getResultLines() {
    return this.#coaches.map((coach) => coach.getResult()).join(NEW_LINE);
  }

  endGame() {
    const resultLines = this.getResultLines();
    const categories = this.#category.getCategoryString();
    printResult(resultLines, categories);
    Console.close();
  }
}

new App().play();

module.exports = App;
