import { StyleSheet } from 'react-native';
import Typography from '../../../theme/Typography';
import Theme from '../../../theme';

const globalPadding = 28;
const dsTipography = Typography();

const styles = StyleSheet.create({
  login: {
    flex: 1
  },
  login__content: {
    flex: 1,
    alignItems: 'center'
  },
  login__cardContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    padding: globalPadding,
    paddingTop: 0
  },
  login__forgotPassword: {
    marginTop: -20,
    width: '100%',
    justifyContent: 'flex-end',
    color: Theme.Colors.Secondary,
    borderRadius: 6
  },
  login__passwordInput: {
    marginTop: globalPadding,
    width: '100%'
  },
  login__button: {
    marginTop: 35,
    width: '100%',
    flex: 2,
    justifyContent: 'flex-end',
    bottom: 0,
    left: 0
  },
  login__button_composite: {
    borderRadius: 6,
    backgroundColor: 'rgb(248, 195, 36)'
  },
  login__logo: {
    marginLeft: -10,
    width: 125,
    height: 125,
    resizeMode: 'contain'
  },
  login_logo_name: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 70,
    width: 260,
    height: 40
  },
  login_logo_lines: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 12,
    left: '68%',
    width: 130,
    height: 60
  },
  login__text: {
    position: 'relative',
    ...dsTipography.title_3,
    fontWeight: 'bold'
  },
  login__WelcomeText: {
    paddingTop: 10,
    position: 'relative',
    ...dsTipography.subtile
  },
  login__passwordLabelText: {
    paddingTop: 40,
    position: 'relative',
    ...dsTipography.subtile
  },
  login__buttonAccount: {
    fontWeight: 'bold',
    marginTop: 15,
    color: 'red'
  },
  login__dialog: {
    position: 'relative'
  }
});

export default styles;
