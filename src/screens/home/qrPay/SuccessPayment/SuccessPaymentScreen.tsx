import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  APPROVAL_ICON,
  DOWNLOAD_ICON,
  SHARE_ICON,
  USER_GRAY_ICON,
} from '../../../../assets/images';
import {
  Container,
  TextContainer,
  Touchable,
  Card,
  Button,
  TextSpan,
} from '../../../../components';
import Theme from '../../../../theme';
import {HomeStackParams, formatDate} from '../../../../utils';
import {useRoute, RouteProp} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const SCREEN_CONTAINER_WIDTH = Dimensions.get('window').width;
interface Props {
  onPressPay: () => void;
}

const SuccessPaymentScreen: React.FC<Props> = ({onPressPay}) => {
  const {
    downloadIconStyle,
    cardStyle,
    approvalIconStyle,
    buttonContainer,
    greenContainerStyle,
    userIconStyle,
  } = styles;
  const {t} = useTranslation();
  const {params: CodePayment} =
    useRoute<RouteProp<HomeStackParams, 'MakePayment'>>();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      bounces={false}
      contentContainerStyle={{flexGrow: 1, paddingBottom: insets.bottom}}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      <Container flex backgroundColor={Theme.Colors.UltralightGrey}>
        <Container flex row space="between" style={greenContainerStyle}>
          <Container>
            <Touchable onPress={() => {}} rounded>
              <Image
                source={DOWNLOAD_ICON}
                style={downloadIconStyle}
                resizeMode="contain"
              />
            </Touchable>
          </Container>
          <Container>
            <Container style={{alignSelf: 'center', marginTop: 24}}>
              <Image
                source={APPROVAL_ICON}
                style={approvalIconStyle}
                resizeMode="contain"
              />
            </Container>
            <TextContainer
              text={t('successPayment:successfulPay')}
              typography="h2"
              textColor={Theme.Colors.Bright}
              marginTop={8}
            />
          </Container>
          <Container>
            <Touchable onPress={() => {}} rounded>
              <Image
                source={SHARE_ICON}
                style={downloadIconStyle}
                resizeMode="contain"
              />
            </Touchable>
          </Container>
        </Container>
        <Container flex row={false} space="between">
          <Card paddingVertical={30} style={cardStyle}>
            <TextContainer
              text={t('successPayment:moneySentTo')}
              typography="h5"
              marginBottom={10}
            />
            <Container style={{flexDirection: 'row'}}>
              <Container>
                <Image
                  source={USER_GRAY_ICON}
                  style={userIconStyle}
                  resizeMode="contain"
                />
              </Container>
              <Container style={{flexDirection: 'column'}}>
                <TextContainer
                  text={t('successPayment:account')}
                  typography="description"
                />
                <TextContainer
                  text={CodePayment.identification}
                  typography="paragraph"
                  marginBottom={60}
                />
              </Container>
            </Container>
            <Container style={{flexDirection: 'column'}} center>
              <TextContainer
                text={t('successPayment:amountSent')}
                typography="paragraph"
                marginBottom={8}
              />
              <TextContainer
                text={`$${CodePayment.amount}.00`}
                typography="h1"
                marginBottom={8}
              />
              <TextContainer
                text={formatDate(new Date(), 'P - hh:mm aaa')}
                typography="label"
                marginBottom={32}
              />
            </Container>
          </Card>
          <Container>
            <Container row middle>
              <TextSpan
                text={t('successPayment:invoice')}
                typography="label"
                marginBottom={8}
                marginTop={24}
              />
              <TextSpan
                text={Date.now().toString()}
                typography="description"
                marginBottom={8}
                marginTop={24}
              />
            </Container>
            <Container row middle>
              <TextContainer
                text={t('successPayment:trackingKey')}
                typography="label"
                marginBottom={10}
              />
              <TextContainer
                text={Date.now().toString()}
                typography="description"
                marginBottom={10}
              />
            </Container>
          </Container>
          <Container style={buttonContainer}>
            <Button
              label={t('successPayment:finish')}
              variant="black"
              onPress={onPressPay}
              marginHorizontal={10}
            />
          </Container>
        </Container>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    height: 300,
    paddingHorizontal: 24,
    marginTop: 160,
    marginBottom: 24,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowOpacity: -2,
    flexDirection: 'column',
  },
  greenContainerStyle: {
    position: 'absolute',
    paddingTop: 15,
    backgroundColor: Theme.Colors.Success,
    height: 260,
    width: SCREEN_CONTAINER_WIDTH,
  },
  buttonContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cardGradient: {
    borderRadius: 16,
  },
  iconContainer: {
    marginTop: 50,
    zIndex: 1,
    alignSelf: 'center',
    position: 'absolute',
  },
  userIconStyle: {
    width: 25,
    height: 25,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  downloadIconStyle: {
    width: 25,
    height: 25,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  approvalIconStyle: {
    width: 48,
    height: 48,
    tintColor: Theme.Colors.Bright,
  },
});

export default SuccessPaymentScreen;
