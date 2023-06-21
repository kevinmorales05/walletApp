import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    radio: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    radio__container: {
      flexDirection: 'row',
    },
    radio__icon__container: {
      paddingRight: 8,
    },
  });
};
