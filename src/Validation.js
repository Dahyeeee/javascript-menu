const { ERROR_MESSAGE, NUMBER } = require("./Constant");

const Validation = {
  validateNamesLength(names) {
    if (!Validation.isEveryNameInRange(names)) {
      throw new Error(ERROR_MESSAGE.notValidNameLength);
    }
  },

  isEveryNameInRange(names) {
    return names.every((name) => Validation.isNameLengthTwoToFour(name));
  },

  isNameLengthTwoToFour(name) {
    return (
      name.length >= NUMBER.minNameLength && name.length <= NUMBER.maxNameLength
    );
  },

  validateCoachNumber(coaches) {
    if (!Validation.isCoachesInRange(coaches)) {
      throw new Error(ERROR_MESSAGE.notValidCoachNumber);
    }
  },

  isCoachesInRange(coaches) {
    return (
      coaches.length >= NUMBER.minCoachNumber &&
      coaches.length <= NUMBER.maxCoachNumber
    );
  },

  validatePickyFoods(foods) {
    if (!Validation.isFoodNumberInRange(foods)) {
      throw new Error(ERROR_MESSAGE.notValidPickyFoodNumber);
    }
  },

  isFoodNumberInRange(foods) {
    return foods.length <= 2;
  },
};

module.exports = Validation;
