import React from 'react';
import {
  ColorValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {ARROW_RIGHT_WHITE_ICON} from '../../assets/images';
import {Container} from '../atoms/Container';
import {Touchable, TouchableProps} from '../atoms/Touchable';
import {CustomText as Text, FontWeightTypes} from '../atoms/CustomText';

interface Props extends TouchableProps {
  label: string;
  backgroundColor?: string;
  gradientColors?: string[];
  borderColor?: string;
  borderWidth?: number;
  textColor?: ColorValue;
  suffixImage?: ImageSourcePropType;
  fontSize?: number;
  fontWeight?: FontWeightTypes;
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  variant?: 'primary' | 'black' | 'gray' | 'custom';
}

const Button: React.FC<Props> = ({
  label,
  onPress,
  disabled,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  backgroundColor = Theme.Colors.Accent,
  gradientColors,
  textColor,
  androidRippleColor = Theme.Colors.Accent,
  borderColor,
  borderWidth,
  suffixImage,
  fontSize,
  fontWeight,
  width = '100%',
  height = 46,
  variant = 'primary',
}: Props) => {
  const {buttonStyle} = styles;

  let gradient: string[] | undefined;
  let background = backgroundColor;
  if (!gradientColors || variant !== 'custom') {
    if (variant === 'primary') gradient = Theme.Colors.ButtonPrimaryGradient;
    if (variant === 'black') gradient = Theme.Colors.ButtonBlackGradient;
    if (variant === 'gray') {
      gradient = undefined;
      background = Theme.Colors.LightGrey;
    }
  } else {
    gradient = gradientColors;
  }

  return (
    <Container
      style={{
        width,
        marginBottom,
        marginTop,
        marginLeft,
        marginRight,
        marginHorizontal,
        marginVertical,
        borderWidth,
        borderColor,
        ...buttonStyle,
      }}>
      <Touchable
        onPress={onPress}
        disabled={disabled}
        androidRippleColor={androidRippleColor}>
        <Container
          row
          middle
          style={{
            backgroundColor: background,
            opacity: disabled ? 0.4 : 1,
            height,
          }}>
          {gradient && (
            <LinearGradient colors={gradient} style={StyleSheet.absoluteFill} />
          )}
          <Text
            text={label}
            typography={variant === 'gray' ? 'buttonDark' : 'buttonWhite'}
            textColor={textColor}
            fontSize={fontSize}
            fontWeight={fontWeight}
          />
          {suffixImage && <Image source={ARROW_RIGHT_WHITE_ICON} />}
        </Container>
      </Touchable>
    </Container>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  suffixImageStyle: {
    width: 16,
    height: 16,
    position: 'absolute',
    alignSelf: 'center',
    right: 24,
  },
});

export {Button};
