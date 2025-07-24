import { Node, PasteRule, mergeAttributes } from "@tiptap/core";
import { InputRule } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    card: {
      insertCard: (rank: string, suit: string) => ReturnType;
    };
  }
}

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
    const rank = node.attrs.rank;
    const suit = node.attrs.suit;

    const suitMap: Record<string, string> = {
      s: "♠",
      h: "♥",
      d: "♦",
      c: "♣",
    };

    console.log(suitMap[suit] || "", suit);

    return `${rank}${suitMap[suit] || ""}`;
  },

  renderHTML({ HTMLAttributes }) {
    const rank = HTMLAttributes["data-rank"];
    const suit = HTMLAttributes["data-suit"];

    const displayText = `${rank}`;

    const suitClassMap: Record<string, string> = {
      s: "spade",
      h: "heart",
      d: "diamond",
      c: "clover",
    };

    const suitEmojiMap: Record<string, string> = {
      s: "♠",
      h: "♥",
      d: "♦",
      c: "♣",
    };

    return [
      "span",
      mergeAttributes(
        {
          "data-card": "",
          "data-rank": rank,
          "data-suit": suit,
          class: `card-node ${suitClassMap[suit] || ""}`,
        },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      displayText,
      [
        "span",
        { style: "visibility: hidden;font-size: 0;" },
        suitEmojiMap[suit] || "",
      ],
    ];
  },

  addCommands() {
    return {
      insertCard:
        (rank: string, suit: string) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              rank,
              suit,
            },
          });
        },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: /([AKQJT98765432])([shdc])$/,
        handler: ({ range, commands, match }) => {
          if (!match) return;

          const [, rank, suit] = match;

          commands.insertContentAt(range, {
            type: this.name,
            attrs: {
              rank,
              suit,
            },
          });
        },
      }),
    ];
  },

  addPasteRules() {
    return [
      new PasteRule({
        find: /([AKQJT98765432])([shdc])/g,
        handler: ({ range, commands, match }) => {
          if (!match) return;

          const [, rank, suit] = match;

          commands.insertContentAt(range, {
            type: this.name,
            attrs: {
              rank,
              suit,
            },
          });
        },
      }),
    ];
  },
});

export default CardNode;
