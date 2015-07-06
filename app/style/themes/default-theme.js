'use strict';

import colors from 'material-ui/lib/styles/colors';
import colorManipulator from 'material-ui/lib/utils/color-manipulator';
import spacing from 'material-ui/lib/styles/spacing';

export default {
  spacing,
  contentFontFamily: 'Roboto, sans-serif',
  getPalette() {
    return {
      textColor: colors.red200,
      canvasColor: colors.red50,
      borderColor: colors.red100,
    };
  },
  getComponentThemes(palette) {
    let obj = {
      flatButton: {
        color: palette.canvasColor,
        hoverColor: colorManipulator.fade(palette.textColor, 0.2),
        textColor: palette.textColor,
      },
      githubButton: {
        color: 'rgba(0, 0, 0, .40)',
        hoverColor: colors.fullBlack,
        rippleColor: colorManipulator.fade(palette.textColor, 0.8),
      },
      toolbar: {
        backgroundColor: palette.canvasColor,
        borderColor: palette.borderColor,
        separatorColor: palette.borderColor,
        textColor: palette.textColor,
      },
      title: {
        color: palette.textColor,
        hoverColor: colors.red300,
      },
      listItem: {
        borderColor: colorManipulator.fade(palette.borderColor, 0.3),
        color: colors.fullBlack,
      },
    };

    return obj;
  },
};
