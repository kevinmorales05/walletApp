import {getStyles} from './Icon.styles';
import {Insets, TouchableOpacity, ViewStyle} from 'react-native';
import ICONS from '../../../assets/icons';
import React, {FunctionComponent} from 'react';
import Svg, {Path} from 'react-native-svg';
import Theme from '../../../theme';

type Props = {
  name: string;
  primaryColor?: string;
  secondaryColor?: string;
  onPress?: () => void;
  onLongPress?: () => void;
  size?: number;
  touchableArea?: number;
  delayLongPress?: number;
  touchable?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  hitSlop?: Insets | boolean;
  testID?: string;
  accessibilityLabel?: string;
};

// This is an object not styles and should have Insets typo
const hitSlopInset: Insets = {top: 16, bottom: 16, left: 16, right: 16};

const Icon: FunctionComponent<Props> = ({
  name,
  primaryColor = '',
  secondaryColor,
  onPress,
  onLongPress,
  delayLongPress = 2000,
  size = ICONS[name] && ICONS[name].secondary ? 32 : 24, // Illustrative Icon: 32, General Icon: 24,
  touchable = true,
  touchableArea = 48,
  testID = 'icon-container',
  accessibilityLabel = 'icon-container',
  style = {},
  disabled = false,
  hitSlop = false,
}) => {
  let hitSlopValue: Insets | undefined;

  if (typeof hitSlop === 'boolean') {
    hitSlopValue = hitSlop ? hitSlopInset : undefined;
  } else {
    hitSlopValue = hitSlop && typeof hitSlop === 'object' ? hitSlop : undefined;
  }

  const primaryFill = primaryColor ? primaryColor : Theme.Colors.Primary;
  const secondaryFill = secondaryColor
    ? secondaryColor
    : Theme.Colors.Secondary;
  const styles = getStyles();
  const isTouchableStyle = onPress
    ? [{width: touchableArea, height: touchableArea}]
    : null;

  return name ? (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      style={[styles.icon, isTouchableStyle, style]}
      disabled={!touchable || disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      hitSlop={hitSlopValue}>
      <Svg viewBox={ICONS[name].viewBox} style={{width: size, height: size}}>
        <Path
          d={ICONS[name].primary}
          fill={disabled ? Theme.Colors.Primary : primaryFill}
          transform={ICONS[name].transformPrimary}
          fillRule={ICONS[name].primaryFillRule}
        />
        {ICONS[name].secondary ? (
          <Path
            d={ICONS[name].secondary}
            fill={disabled ? Theme.Colors.Primary : secondaryFill}
            fillRule={ICONS[name].secondaryFillRule}
          />
        ) : null}
      </Svg>
    </TouchableOpacity>
  ) : null;
};

export default Icon;
