import React from 'react';
import {Container} from '../atoms/Container';
import {CustomText as Text, CustomTextProps} from '../atoms/CustomText';

export interface TextContainerProps extends CustomTextProps {
  marginRight?: number;
  marginLeft?: number;
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  marginVertical?: number;
}

const TextContainer: React.FC<TextContainerProps> = ({
  marginBottom,
  marginTop,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  text,
  fontSize,
  typography,
  textColor,
  textAlign,
  fontWeight,
  numberOfLines,
  transform,
  underline,
  allowFontScaling,
  spacing,
  lineHeight,
  testID,
}: TextContainerProps) => (
  <Container
    style={{
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      marginHorizontal,
      marginVertical,
    }}>
    <Text
      testID={testID}
      text={text}
      fontSize={fontSize}
      typography={typography}
      textColor={textColor}
      textAlign={textAlign}
      fontWeight={fontWeight}
      numberOfLines={numberOfLines}
      transform={transform}
      underline={underline}
      allowFontScaling={allowFontScaling}
      spacing={spacing}
      lineHeight={lineHeight}
    />
  </Container>
);

export {TextContainer};
