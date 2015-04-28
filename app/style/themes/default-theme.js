'use strict';

const colors = require('material-ui/lib/styles/colors');
const colorManipulator = require('material-ui/lib/utils/color-manipulator');
const spacing = require('material-ui/lib/styles/spacing');

const DefaultTheme = {
  spacing: spacing,
  contentFontFamily: 'Roboto, sans-serif',
  getPalette() {
    return {
      textColor: colors.red200,
      canvasColor: colors.red50,
      borderColor: colors.red100
    };
  },
  getComponentThemes(palette) {
    let obj = {
      flatButton: {
        color: palette.canvasColor,
        hoverColor: colorManipulator.fade(palette.textColor, 0.2),
        textColor: palette.textColor
      },
      githubButton: {
        color: 'rgba(0, 0, 0, .40)',
        hoverColor: colors.fullBlack,
        rippleColor: colorManipulator.fade(palette.textColor, 0.8)
      },
      toolbar: {
        backgroundColor: palette.canvasColor,
        borderColor: palette.borderColor,
        separatorColor: palette.borderColor,
        textColor: palette.textColor
      },
      title: {
        color: palette.textColor,
        hoverColor: colors.red300
      },
      listItem: {
        borderColor: '#EBEBEB',
        color: colorManipulator.fade('rgba(0, 0, 0, .035)', 0),
        hoverColor: 'rgba(0, 0, 0, .035)'
      }
    };

    return obj;
  }
};

module.exports = DefaultTheme;
