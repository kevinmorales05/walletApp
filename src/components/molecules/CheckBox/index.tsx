import {FlexAlignType, TouchableOpacity, View} from 'react-native';
import {getStyles} from './CheckBox.styles';
import Theme from '../../../theme';
import {SELECTORS} from './../../../enums';
import Icon from '../../atoms/Icon';
import React, {ForwardedRef, forwardRef, FunctionComponent} from 'react';

type Props = {
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: number;
  testID?: string;
  accessibilityLabel?: string;
  align?: FlexAlignType;
  children?: any;
};

const CheckBox: FunctionComponent<Props> = forwardRef(
  (
    {
      onPress = () => {},
      size = 20,
      children,
      selected = false,
      disabled = false,
      testID = 'checkBox-touch',
      accessibilityLabel = 'checkBox-touch',
      align = 'center',
    }: Props,
    ref: ForwardedRef<any>,
  ) => {
    const styles = getStyles();

    let primaryColor = Theme.Colors.Accent;
    if (disabled) {
      primaryColor = Theme.Colors.Accent;
    }

    return (
      <TouchableOpacity
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        onPress={onPress}
        style={styles.checkBox}
        disabled={disabled}>
        <View style={[styles.checkBox__container, {alignItems: align}]}>
          <View style={styles.checkBox__iconContainer}>
            <Icon
              name={selected ? SELECTORS.CHECKBOX_ON : SELECTORS.CHECKBOX_OFF}
              primaryColor={primaryColor}
              size={size}
              touchable={false}
              style={styles.checkBox__iconContainer}
            />
          </View>
          <View style={styles.checkBox__contentContainer}>{children}</View>
        </View>
      </TouchableOpacity>
    );
  },
);

export {CheckBox};
