import React, {ReactNode} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import Theme from '../../../theme';

import {Container} from '../Container';
import {Touchable} from '../Touchable';

interface Props {
  children: ReactNode | ReactNode[];
  shadow?: boolean;
  padding?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  onPress?: () => void;
  flex?: boolean | number;
  disabled?: boolean;
  column?: boolean;
  backgroundColor?: string;
  center?: boolean;
  crossCenter?: boolean;
  style?: ViewStyle;
  testID?: string;
}

const Card: React.FC<Props> = ({
  children,
  shadow = true,
  style,
  padding = 16,
  paddingHorizontal,
  paddingVertical,
  onPress,
  flex,
  disabled,
  column,
  backgroundColor = Theme.Colors.Bright,
  center,
  crossCenter,
  testID,
}: Props) => {
  const {cardStyle, shadowStyle} = styles;

  const renderContainer = () => (
    <Container
      testID={testID}
      row={!column}
      backgroundColor={backgroundColor}
      center={center}
      crossCenter={crossCenter}
      style={[
        cardStyle,
        shadow && shadowStyle,
        {padding, paddingHorizontal, paddingVertical},
        style,
      ]}>
      {children}
    </Container>
  );

  if (onPress) {
    return (
      <Touchable
        testID={`${testID}-touchable`}
        flex={flex}
        disabled={!onPress || disabled}
        onPress={onPress || (() => {})}>
        {renderContainer()}
      </Touchable>
    );
  }

  return renderContainer();
};

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 8,
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});

export {Card};
