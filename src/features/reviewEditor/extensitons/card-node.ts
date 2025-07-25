import { Node, mergeAttributes, InputRule, PasteRule } from "@tiptap/core";

// 型定義
type Rank =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";
type Suit = "s" | "h" | "d" | "c";
type SuitEmoji = "♠" | "♥" | "♦" | "♣";
type SuitOrEmoji = Suit | SuitEmoji;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    card: {
      insertCard: (rank: Rank, suit: Suit) => ReturnType;
    };
  }
}

// 定数定義
const SUIT_CLASS_MAP: Record<Suit, string> = {
  s: "spade",
  h: "heart",
  d: "diamond",
  c: "clover",
};

const SUIT_EMOJI_MAP: Record<Suit, SuitEmoji> = {
  s: "♠",
  h: "♥",
  d: "♦",
  c: "♣",
};

const REGEXP_TO_SUIT_MAP: Record<SuitOrEmoji, Suit> = {
  "♠": "s",
  "♥": "h",
  "♦": "d",
  "♣": "c",
  s: "s",
  h: "h",
  d: "d",
  c: "c",
};

const CARD_REGEX = /([AKQJT98765432])([shdc♠♥♦♣])/;

const CardNode = Node.create({
  name: "card",

  group: "inline",

  inline: true,

  atom: true,

  selectable: false,

  addAttributes() {
    return {
      rank: {
        parseHTML: (element) => element.getAttribute("data-rank"),
        renderHTML: (attributes) => {
          if (!attributes.rank) {
            return {};
          }
          return {
            "data-rank": attributes.rank,
          };
        },
      },
      suit: {
        parseHTML: (element) => element.getAttribute("data-suit"),
        renderHTML: (attributes) => {
          if (!attributes.suit) {
            return {};
          }
          return {
            "data-suit": attributes.suit,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-card]",
      },
    ];
  },

  renderText({ node }) {
    const { rank, suit } = node.attrs as { rank: Rank; suit: Suit };
    return `${rank}${SUIT_EMOJI_MAP[suit] || ""}`;
  },

  renderHTML({ HTMLAttributes }) {
    const { "data-rank": rank, "data-suit": suit } = HTMLAttributes as {
      "data-rank": Rank;
      "data-suit": Suit;
    };

    return [
      "span",
      mergeAttributes(
        {
          "data-card": "",
          "data-rank": rank,
          "data-suit": suit,
          class: `card-node ${SUIT_CLASS_MAP[suit] || ""}`,
        },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      rank,
      [
        "span",
        { style: "visibility: hidden; font-size: 0;" },
        SUIT_EMOJI_MAP[suit] || "",
      ],
    ];
  },

  addCommands() {
    return {
      insertCard:
        (rank: Rank, suit: Suit) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { rank, suit },
          });
        },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: new RegExp(`${CARD_REGEX.source}$`),
        handler: ({ range, commands, match }) => {
          if (!match) return;

          const [, rank, suitOrEmoji] = match as [string, Rank, SuitOrEmoji];
          const suit = REGEXP_TO_SUIT_MAP[suitOrEmoji];

          commands.insertContentAt(range, {
            type: this.name,
            attrs: { rank, suit },
          });
        },
      }),
    ];
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: new RegExp(CARD_REGEX.source, "g"),
        handler: ({ range, commands, match }) => {
          if (!match) return;

          const [, rank, suitOrEmoji] = match as [string, Rank, SuitOrEmoji];
          const suit = REGEXP_TO_SUIT_MAP[suitOrEmoji];

          commands.insertContentAt(range, {
            type: this.name,
            attrs: { rank, suit },
          });
        },
      }),
    ];
  },
});

export default CardNode;
