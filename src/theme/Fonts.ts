import {Platform} from 'react-native';

const Fonts = {
  Bold: Platform.OS === 'android' ? 'NotoSans-Bold' : 'NotoSansJP-Bold',
  Regular:
    Platform.OS === 'android' ? 'NotoSans-Regular' : 'NotoSansJP-Regular',
};

export default Fonts;
