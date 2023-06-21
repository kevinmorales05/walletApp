import React from 'react';
import {
  Text,
  TextStyle,
  StyleProp,
  StyleSheet,
  FlexAlignType,
} from 'react-native';
import Theme from '../../../theme';

export type TypographyTypes =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'buttonDark'
  | 'buttonWhite'
  | 'link'
  | 'link2'
  | 'tableHeader'
  | 'paragraph'
  | 'placeholder'
  | 'description'
  | 'label';

export type FontWeightTypes = 'Regular' | 'Bold';

export interface CustomTextProps {
  text: string;
  textAlign?: TextStyle['textAlign'];
  textColor?: TextStyle['color'];
  typography?: TypographyTypes;

  fontWeight?: FontWeightTypes;
  fontSize?: number;
  numberOfLines?: number;
  transform?: TextStyle['textTransform'];
  underline?: boolean;
  allowFontScaling?: boolean;
  spacing?: number;
  lineHeight?: number;
  alignSelf?: FlexAlignType;
  testID?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  text,
  typography = 'paragraph',
  textColor,
  textAlign,
  fontWeight,
  fontSize,
  numberOfLines,
  transform,
  underline,
  allowFontScaling,
  spacing,
  lineHeight,
  alignSelf,
  testID,
}: CustomTextProps) => {
  const textStyle: StyleProp<TextStyle> = [];
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

  if (fontSize) textStyle.push({fontSize});
  if (textColor) textStyle.push({color: textColor});

  if (fontWeight) {
    textStyle.push({
      fontFamily: Theme.Fonts[fontWeight],
    });
  }

  return (
    <Text
      testID={testID}
      style={[
        textStyle,
        {
          textAlign,
          textTransform: transform,
          textDecorationLine: underline ? 'underline' : 'none',
          letterSpacing: spacing,
          lineHeight,
          alignSelf,
        },
      ]}
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      allowFontScaling={allowFontScaling}>
      {text}
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

export {CustomText};
