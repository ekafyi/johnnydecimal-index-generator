// color-tokens.json
interface IColorTokenList {
  surface?: IColorToken[];
  onSurface?: IColorToken[];
  interactive?: IColorToken[];
  primary?: IColorToken[];
  secondary?: IColorToken[];
  critical?: IColorToken[];
  highlight?: IColorToken[];
  success?: IColorToken[];
}

interface IColorToken {
  name: string;
  description?: string;
  tw?: IColorTailwindMapping;
}

interface IColorTailwindMapping {
  colorName: string;
  key?: number;
}

interface ITempTokenObject {
  [key: string]: any;
}

export const fakeData: IColorToken[] = [
  {
    name: "background",
    description: "For use as a background color, in components such as Page and Frame backgrounds.",
    tw: {
      colorName: "warmGray",
      key: 50,
    },
  },
  {
    name: "backgroundHovered",
    description: "For use when an action or navigation is used on a background.",
    tw: {
      colorName: "warmGray",
      key: 100,
    },
  },
  {
    name: "surface",
    description: "For use as a background color, in components such as Card, Modal, and Popover.",
    tw: {
      colorName: "white",
    },
  },
];

export const moreFakeData: IColorToken[] = [
  {
    name: "actionPrimary",
    description:
      "Used as the background color for primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
    tw: {
      colorName: "blue",
      key: 800,
    },
  },
  {
    name: "actionPrimaryHovered",
    description:
      "Used as the background color for hovered primary actions, and as the fill color for icons and the text color in navigation and tabs to communicate interaction states.",
    tw: {
      colorName: "blue",
      key: 900,
    },
  },
];

export const convertColorTokensToTwObject = (tokens: IColorToken[], twColors) => {
  const prefix = "ejd";
  let tempObj: ITempTokenObject = {};
  tokens.forEach((token) => {
    if (token.tw?.colorName) {
      tempObj[`${prefix}-${token.name}`] = token.tw?.key
        ? twColors[token.tw.colorName][token.tw.key]
        : twColors[token.tw.colorName];
    }
  });
  return tempObj;
};

export const convertColorTokenListToTwObject = (tokenList: IColorTokenList, twColors) => {
  const flattened = Object.values(tokenList).flat() || [];
  return convertColorTokensToTwObject(flattened, twColors);
};
