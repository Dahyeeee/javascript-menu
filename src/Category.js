const { RESULT } = require("./Constant");
const { getCategory } = require("./RandomMachine");

class Category {
  #categories = [];
  #days;
  #limit;

  constructor(days, limit) {
    this.#days = days;
    this.#limit = limit;
    this.#setCategories();
  }

  #setCategories() {
    while (this.#categories.length < this.#days) {
      this.#setCategoryOfDay();
    }
  }

  #setCategoryOfDay() {
    const categoryOfDay = getCategory();
    if (!this.#isCategoryExceedLimit(categoryOfDay, this.#limit)) {
      this.#categories.push(categoryOfDay);
    }
  }

  #isCategoryExceedLimit(categoryOfDay, limit) {
    return (
      this.#categories.filter((category) => category === categoryOfDay)
        .length >= limit
    );
  }

  getCategoryOfDay(day) {
    return this.#categories[day];
  }

  getCategoryString() {
    return `[ ${RESULT.category} | ${this.#categories.join(RESULT.divider)} ]`;
  }
}

module.exports = Category;
