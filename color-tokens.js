// https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js
const colors = require("tailwindcss/colors");

const CUSTOM_BLUE = "#03a9f4";
const BODY_TEXT = colors.blueGray[900];

// Leave for checking
// const myColors = {
//   blue: colors.amber,
//   foo: "hotpink",
//   bar: "#ffcc00",
//   blue: {
//     450: "hotpink",
//     700: "hotpink",
//   },
// };

const myColors = {
  /** Background colour */
  "ejd-bg": CUSTOM_BLUE,
  /** Text colour */
  "ejd-text": BODY_TEXT,
  /** Disabled and placeholder text colour */
  "ejd-textDisabled": colors.blueGray[500],
  /** Default border */
  "ejd-border": colors.blueGray[900],
  /** Subdued border, eg. in input fields */
  "ejd-borderSubdued": colors.blueGray[300],
  /** Separator - not used */
  "ejd-separator": colors.blueGray[300],
  /** Background colour in cards */
  "ejd-surface": colors.white,
  /** Hoverackground colour in cards */
  "ejd-surfaceHover": colors.coolGray[100],
  /** Subdued background colour in cards */
  "ejd-surfaceSubdued": colors.yellow[200],
  /** Used as the background colour in main CTA button */
  "ejd-actionPrimary": colors.yellow[300],
  /** Used as the hover background colour in main CTA button */
  "ejd-actionPrimaryHovered": colors.yellow[400],
  /** Used as the text background colour in main CTA button */
  "ejd-textOnPrimary": BODY_TEXT,
  /** For use as a surface color on J.D id label */
  "ejd-surfaceHighlight": colors.lightBlue[50],
  /** For use as a border color on J.D id label */
  "ejd-borderHighlight": colors.lightBlue[500],
  /** For use as a text color on J.D id label */
  "ejd-textOnHighlight": BODY_TEXT,
  /** For use as a surface color on critical components */
  "ejd-surfaceCritical": colors.red[600],
  /** For use as a text color on critical components */
  "ejd-textOnCritical": colors.white,
  /** Used for secondary buttons ie. Edit & Delete buttons as background colour */
  "ejd-actionSecondary": colors.blueGray[200],
  /** Text colour in secondary buttons ie. Edit & Delete buttons */
  "ejd-textOnSecondary": colors.coolGray[600],
  /** Background colour in Add Area/Category/Thing form button */
  "ejd-actionTertiary": colors.blueGray[300],

  // I gave up trying to give these proper, abstract, design tokenish names. 🤷🏽‍♀️
  // "ejd-borderInputField": colors.white,

  //
  // textOnInputField
  //
};

module.exports = myColors;
