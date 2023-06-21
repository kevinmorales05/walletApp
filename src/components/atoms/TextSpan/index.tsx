import React, {ReactNode} from 'react';
import {StyleProp, TextStyle, Text, StyleSheet} from 'react-native';
import Theme from '../../../theme';

import {TypographyTypes, FontWeightTypes} from '../CustomText';

export interface TextSpanProps {
  text?: string;
  textAlign?: TextStyle['textAlign'];
  textColor?: TextStyle['color'];
  typography?: TypographyTypes;

  fontWeight?: FontWeightTypes;

  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  fontSize?: number;

  children?: ReactNode;
  onPress?: () => void;

  transform?: TextStyle['textTransform'];
  underline?: boolean;
  spacing?: number;
  lineHeight?: number;

  testID?: string;
}

const TextSpan: React.FC<TextSpanProps> = ({
  text = '',
  typography = 'paragraph',
  textColor,
  textAlign,
  fontWeight,
  children,
  onPress,
  fontSize,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  transform,
  underline,
  spacing,
  lineHeight,
  testID,
}) => {
  const textStyle: StyleProp<TextStyle> = [];

  const defineTypography = () => {
    switch (typography) {
      case 'h1':
        textStyle.push(styles.h1);
        break;
      case 'h2':
        textStyle.push(styles.h2);
        break;
      case 'h3':
        textStyle.push(styles.h3);
        break;
      case 'h4':
        textStyle.push(styles.h4);
        break;
      case 'h5':
        textStyle.push(styles.h5);
        break;
      case 'buttonDark':
        textStyle.push(styles.buttonDark);
        break;
      case 'buttonWhite':
        textStyle.push(styles.buttonWhite);
        break;
      case 'link':
        textStyle.push(styles.link);
        break;
      case 'link2':
        textStyle.push(styles.link2);
        break;
      case 'tableHeader':
        textStyle.push(styles.tableHeader);
        break;
      case 'paragraph':
        textStyle.push(styles.paragraph);
        break;
      case 'placeholder':
        textStyle.push(styles.placeholder);
        break;
      case 'description':
        textStyle.push(styles.description);
        break;
      case 'label':
        textStyle.push(styles.label);
        break;
      default:
        break;
    }
  };

  if (children) {
    defineTypography();

    textStyle.push({
      color: textColor || Theme.Colors.Black,
      textAlign: textAlign || 'auto',
    });
  } else {
    if (typography) defineTypography();
    if (textColor) textStyle.push({color: textColor});
    if (textAlign) textStyle.push({textAlign});
  }

  if (fontSize) textStyle.push({fontSize});

  if (fontWeight) {
    textStyle.push({
      fontFamily: Theme.Fonts[fontWeight],
    });
  }

  textStyle.push({
    marginBottom,
    marginTop,
    marginLeft,
    marginRight,
    textTransform: transform,
    textDecorationLine: underline ? 'underline' : 'none',
    letterSpacing: spacing,
    lineHeight,
  });

  return (
    <Text testID={testID} onPress={onPress} style={textStyle}>
      {children || text}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: Theme.Sizes.H1,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Black,
  },
  h2: {
    fontSize: Theme.Sizes.H2,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Black,
  },
  h3: {
    fontSize: Theme.Sizes.H3,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Black,
  },
  h4: {
    fontSize: Theme.Sizes.H4,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Black,
  },
  h5: {
    fontSize: Theme.Sizes.H5,
    fontFamily: Theme.Fonts.Regular,
    color: Theme.Colors.Black,
  },
  buttonDark: {
    fontSize: Theme.Sizes.Button,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Text,
  },
  buttonWhite: {
    fontSize: Theme.Sizes.Button,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Bright,
  },
  link: {
    fontSize: Theme.Sizes.Link,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.BluishGrey,
  },
  link2: {
    fontSize: Theme.Sizes.Link,
    fontFamily: Theme.Fonts.Regular,
    color: Theme.Colors.NuggetGold,
  },
  tableHeader: {
    fontSize: Theme.Sizes.TableHeader,
    fontFamily: Theme.Fonts.Bold,
    color: Theme.Colors.Black,
  },
  paragraph: {
    fontSize: Theme.Sizes.Paragraph,
    fontFamily: Theme.Fonts.Regular,
    color: Theme.Colors.Black,
  },
  placeholder: {
    fontSize: Theme.Sizes.PlaceHolder,
    fontFamily: Theme.Fonts.Regular,
    color: Theme.Colors.BlueHeeler,
  },
  description: {
    fontSize: Theme.Sizes.Description,
    fontFamily: Theme.Fonts.Regular,
    color: Theme.Colors.Text,
  },
  label: {
    fontSize: Theme.Sizes.Label,
    fontFamily: Theme.Fonts.Regular,
    color: Theme.Colors.BluishGrey,
  },
});

export {TextSpan};
