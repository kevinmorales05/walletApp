import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  ARROW_LEFT_BLACK_ICON,
  DOLLAR_WHITE_ICON,
} from '../../../../assets/images';

import {
  Container,
  Text,
  TextContainer,
  Touchable,
  Card,
  Button,
  FadeInImage,
} from '../../../../components';
import Theme from '../../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import {CodePayment} from '../../../../utils';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ICON_CONTAINER_WIDTH = Dimensions.get('window').width - 16 * 2 - 20 * 2;

interface Props {
  codePayment: CodePayment;
  onPressBack: () => void;
  onPressCancel: () => void;
  onPressUnavailableItem: () => void;
  onPressPay: () => void;
}

/* interface CardComponentProps {
  onPressUnavailableItem: () => void;
  onPressPay: () => void;
} */

const MakePaymentScreen: React.FC<Props> = ({
  codePayment,
  onPressBack,
  onPressCancel,
  onPressUnavailableItem,
  onPressPay,
}) => {
  const {
    arrowContainer,
    arrowStyle,
    cardStyle,
    hairline,
    infoContainer,
    buttonContainer,
    iconContainer,
  } = styles;
  const {t} = useTranslation();
  const insets = useSafeAreaInsets();

  return (
    <Container flex>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text text={t('makePayment:pay')} typography="h3" textAlign="center" />
        <Container style={arrowContainer}>
          <Touchable onPress={onPressBack} rounded>
            <Image
              source={ARROW_LEFT_BLACK_ICON}
              style={arrowStyle}
              resizeMode="contain"
            />
          </Touchable>
        </Container>
      </Container>

      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: insets.bottom}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Container
          flex
          backgroundColor={Theme.Colors.UltralightGrey}
          style={{paddingHorizontal: 16}}>
          <Container flex row={false} space="between">
            <Container
              style={iconContainer}
              width={45}
              height={45}
              middle
              circle>
              <LinearGradient
                style={StyleSheet.absoluteFill}
                colors={Theme.Colors.ButtonBlackGradient}
              />
              <FadeInImage source={DOLLAR_WHITE_ICON} width={15} height={24} />
            </Container>
            <Card style={cardStyle} center>
              <TextContainer
                text={t('makePayment:makingPayment')}
                marginBottom={10}
                typography="h5"
              />
              <TextContainer
                text={`$${codePayment.amount}.00`}
                typography="h1"
                marginBottom={30}
              />
              <Container style={infoContainer}>
                <TextContainer
                  text={t('makePayment:addressee')}
                  typography="link"
                  marginRight={10}
                  alignSelf="flex-start"
                />
                <TextContainer
                  text={codePayment.identification}
                  typography="paragraph"
                  alignSelf="flex-end"
                  marginBottom={24}
                />
              </Container>

              <View style={hairline} />
              <Container style={infoContainer}>
                <TextContainer
                  text={t('makePayment:validity')}
                  typography="link"
                  marginRight={10}
                  alignSelf="flex-start"
                />
                <TextContainer
                  text="16/03/22 06:00"
                  typography="paragraph"
                  alignSelf="flex-end"
                />
              </Container>
              <Container style={infoContainer}>
                <TextContainer
                  text={t('makePayment:invoice')}
                  typography="link"
                  marginRight={10}
                  alignSelf="flex-start"
                />
                <TextContainer
                  text="89584784749"
                  typography="paragraph"
                  alignSelf="flex-end"
                />
              </Container>
              <TextContainer
                text={t('makePayment:verifyInfo')}
                typography="label"
                textAlign="justify"
                marginBottom={5}
                marginTop={50}
              />
              <TextContainer
                text={t('makePayment:discountedFrom')}
                typography="label"
                textAlign="justify"
                marginBottom={10}
              />
            </Card>
            <Container style={buttonContainer}>
              <Button
                label={t('makePayment:cancel')}
                variant="gray"
                onPress={onPressCancel}
                marginHorizontal={10}
              />
              <Button
                label={t('makePayment:pay')}
                onPress={onPressPay}
                marginHorizontal={10}
              />
            </Container>
          </Container>
        </Container>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingTop: 30,
    paddingBottom: 16,
    marginTop: 80,
    borderRadius: 8,
    shadowOpacity: -2,
    flexDirection: 'column',
  },
  infoContainer: {
    marginTop: 20,
    width: ICON_CONTAINER_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    marginHorizontal: 30,
    flexDirection: 'row',
    paddingHorizontal: 70,
    justifyContent: 'center',
    marginBottom: 24,
  },
  hairline: {
    backgroundColor: Theme.Colors.UltralightGrey,
    height: 1,
    width: ICON_CONTAINER_WIDTH,
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

  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  arrowStyle: {
    width: 19,
    height: 22,
    marginHorizontal: 16,
    marginVertical: 12,
  },
});

export default MakePaymentScreen;
