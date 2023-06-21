import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {
  CARD_ICON,
  CHEVRON_RIGHT_ICON,
  DOLLAR_WHITE_ICON,
  DROP_ICON,
  LOGO,
  MENU_ICON,
  QR_ICON,
  ZONE_ICON,
} from '../../../assets/images';
import {
  Card,
  Container,
  FadeInImage,
  Text,
  TextContainer,
  TextSpan,
  Touchable,
} from '../../../components';
import Theme from '../../../theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../reactRedux';

interface Props {
  onPressMenu: () => void;
  onPressSend: () => void;
  onPressMyAccount: () => void;
  onPressQrAmount: () => void;
  onPressQrPay: () => void;
  onPressMakePayment: () => void;
}

const HomeScreen: React.FC<Props> = ({
  onPressMenu,
  onPressSend,
  onPressMyAccount,
  onPressQrAmount,
  onPressQrPay,
  onPressMakePayment,
}) => {
  const userAuth = useSelector((state: RootState) => state.auth);
  const {bottomSheetStyle, borderButtonStyle} = styles;
  const {t} = useTranslation();

  return (
    <Container flex>
      <Container
        row
        center
        space="between"
        backgroundColor={Theme.Colors.Bright}>
        <Touchable onPress={onPressMenu}>
          <FadeInImage
            source={MENU_ICON}
            fadeIn={false}
            width={14}
            height={16}
            style={{margin: 16}}
          />
        </Touchable>

        <FadeInImage
          source={LOGO}
          fadeIn={false}
          width={100}
          height={32}
          style={{marginRight: 16}}
        />
      </Container>

      <Container flex />

      <Container style={{paddingHorizontal: 16}}>
        <TextSpan marginBottom={24}>
          <TextSpan text={t('home:hello')} typography="h3" />
          <TextSpan
            text={` ${userAuth.name}`}
            typography="h3"
            textColor={Theme.Colors.Accent}
          />
        </TextSpan>

        <Card paddingVertical={12} center onPress={onPressMyAccount}>
          <Container width={45} height={45} middle circle>
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={Theme.Colors.ButtonPrimaryGradient}
            />
            <FadeInImage source={CARD_ICON} width={27} height={24} />
          </Container>

          <Container flex>
            <TextContainer
              text={t('home:myAccount')}
              fontSize={16}
              textColor={Theme.Colors.Black}
              marginLeft={16}
            />
          </Container>

          <FadeInImage source={CHEVRON_RIGHT_ICON} width={10} height={16} />
        </Card>

        <Container row style={{marginTop: 16}}>
          <Container flex style={{marginRight: 8}}>
            <Card center onPress={onPressSend}>
              <Container width={45} height={45} middle circle>
                <LinearGradient
                  style={StyleSheet.absoluteFill}
                  colors={Theme.Colors.ButtonBlackGradient}
                />
                <FadeInImage
                  source={DOLLAR_WHITE_ICON}
                  width={15}
                  height={24}
                />
              </Container>
              <TextContainer
                text={t('home:send')}
                fontSize={16}
                textColor={Theme.Colors.Black}
                marginLeft={12}
              />
            </Card>
          </Container>
          <Container flex style={{marginLeft: 8}}>
            <Card center onPress={() => {}}>
              <Container width={45} height={45} middle circle>
                <LinearGradient
                  style={StyleSheet.absoluteFill}
                  colors={Theme.Colors.ButtonBlackGradient}
                />
                <FadeInImage source={DROP_ICON} width={16} height={24} />
              </Container>
              <TextContainer
                text={t('home:services')}
                fontSize={16}
                textColor={Theme.Colors.Black}
                marginLeft={12}
              />
            </Card>
          </Container>
        </Container>
      </Container>

      <Container style={bottomSheetStyle}>
        <Text text={t('home:needMsg')} typography="h4" textAlign="center" />

        <Container row style={{marginTop: 34}}>
          <Container flex style={{marginRight: 8}}>
            <Card
              column
              center
              shadow={false}
              paddingVertical={21}
              style={borderButtonStyle}
              onPress={onPressQrAmount}>
              <FadeInImage source={QR_ICON} width={28} height={32} />
              <TextContainer
                text={t('home:collect')}
                fontSize={16}
                textColor={Theme.Colors.Text}
                marginTop={8}
              />
            </Card>
          </Container>
          <Container flex style={{marginLeft: 8}}>
            <Card
              column
              center
              shadow={false}
              paddingVertical={21}
              style={borderButtonStyle}
              onPress={onPressQrPay}>
              <FadeInImage source={ZONE_ICON} width={28} height={32} />
              <TextContainer
                text={t('home:pay')}
                fontSize={16}
                textColor={Theme.Colors.Text}
                marginTop={8}
              />
            </Card>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  bottomSheetStyle: {
    backgroundColor: Theme.Colors.Bright,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 22,
    paddingBottom: 60,
    paddingHorizontal: 16,
    marginTop: 32,
  },
  borderButtonStyle: {
    borderWidth: 1,
    borderColor: Theme.Colors.MedGray,
  },
});

export default HomeScreen;
