const { Random } = require("@woowacourse/mission-utils");
const { CATEGORY, CATEGORY_MATCH } = require("./data");

const RandomMachine = {
  CATEGORY_START_NUMBER: 1,
  CATEGORY_END_NUMBER: 5,

  getCategory() {
    const category =
      CATEGORY_MATCH[
        Random.pickNumberInRange(
          RandomMachine.CATEGORY_START_NUMBER,
          RandomMachine.CATEGORY_END_NUMBER
        )
      ];
    return category;
  },

  getFood(category) {
    const menus = CATEGORY[category];
    const length = menus.length;
    const tempArr = [...Array(length)].map((_, i) => i + 1);
    const random = Random.shuffle(tempArr)[0];
    console.log(menus[random], random);
    return menus[random - 1];
  },
};

RandomMachine.getFood("한식");
module.exports = RandomMachine;
