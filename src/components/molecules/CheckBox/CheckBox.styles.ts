import {StyleSheet} from 'react-native';

export const getStyles = () => {
  return StyleSheet.create({
    checkBox: {
      flexBasis: 20,
      alignItems: 'center',
      flexDirection: 'row',
    },
    checkBox__container: {
      flexDirection: 'row',
    },
    checkBox__iconContainer: {
      paddingRight: 5,
    },
    checkBox__contentContainer: {
      flex: 1,
    },
  });
};
