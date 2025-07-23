import { Extension, InputRule, PasteRule } from "@tiptap/core";

const rankMap = {
  A: "A",
  K: "K",
  Q: "Q",
  J: "J",
  T: "T",
  9: "9",
  8: "8",
  7: "7",
  6: "6",
  5: "5",
  4: "4",
  3: "3",
  2: "2",
};

const suitMap = {
  s: "♠️",
  h: "❤️",
  d: "♦️",
  c: "♣️",
};

type Rank = keyof typeof rankMap;
type Suit = keyof typeof suitMap;

const inputRule = new InputRule({
  find: /([AKQJT98765432])([shdc])/,
  handler: ({ range, commands, match }) => {
    if (!match) return;

    const rankLetter = match[1] as Rank;
    const suitLetter = match[2] as Suit;
    commands.insertContentAt(
      range,
      `${rankMap[rankLetter]}${suitMap[suitLetter]}`
    );
  },
});

const pasteRule = new PasteRule({
  find: /([AKQJT98765432])([shdc])/g,
  handler: ({ range, commands, match }) => {
    if (!match) return;

    const rankLetter = match[1] as Rank;
    const suitLetter = match[2] as Suit;
    commands.insertContentAt(
      range,
      `${rankMap[rankLetter]}${suitMap[suitLetter]}`
    );
  },
});

const HandInput = Extension.create({
  name: "hand-input",

  addInputRules() {
    return [inputRule];
  },

  addPasteRules() {
    return [pasteRule];
  },
});

export default HandInput;
