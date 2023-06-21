import React, {ForwardedRef, forwardRef, FunctionComponent} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {getStyles} from './Radio.styles';
import Theme from '../../../theme';
import {SELECTORS} from '../../../enums';
import Icon from '../../atoms/Icon';

type Props = {
  onPress?: () => void;
  selected?: boolean;
  disabled?: boolean;
  size?: number;
  children: any;
};

const Radio: FunctionComponent<Props> = forwardRef(
  (
    {
      onPress = () => {},
      size = 20,
      selected = false,
      disabled = false,
      children,
    }: Props,
    ref: ForwardedRef<any>,
  ) => {
    const styles = getStyles();
    let primaryColor = selected
      ? Theme.Colors.NuggetGold
      : Theme.Colors.MedGray;
    if (disabled) {
      primaryColor = Theme.Colors.UltralightGrey;
    }

    return (
      <View style={styles.radio__container}>
        <TouchableOpacity
          ref={ref}
          onPress={onPress}
          style={styles.radio}
          disabled={disabled}>
          <View style={styles.radio__icon__container}>
            <Icon
              name={selected ? SELECTORS.RADIO_ON : SELECTORS.RADIO_OFF}
              primaryColor={primaryColor}
              size={size}
              touchable={false}
            />
          </View>

          {children}
        </TouchableOpacity>
      </View>
    );
  },
);

export default Radio;
