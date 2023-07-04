import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import {
  ARROW_LEFT_BLACK_ICON,
  AURUM_ICON,
  EYE_ICON_AURUM,
  ACCOUNT_INFO_ICON,
  DOLLAR_INFO_ICON,
  ADD_CARD_ICON,
} from '../../../../assets/images';

import {
  Container,
  Text,
  TextContainer,
  Touchable,
  FadeInImage,
} from '../../../../components';
import Theme from '../../../../theme';
import LinearGradient from 'react-native-linear-gradient';

const ICON_CONTAINER_WIDTH =
  (Dimensions.get('window').width - 16 * 2 - 20 * 2) / 3;

interface Props {
  onPressBack: () => void;
  onPressUnavailableItem: () => void;
  balance: any;
  fetchingBalance: boolean;
}

interface HeaderComponentProps {
  balance: any;
  onPressUnavailableItem: () => void;
  fetchingBalance: boolean;
}

const MyAccountScreen: React.FC<Props> = ({
  onPressBack,
  onPressUnavailableItem,
  balance,
  fetchingBalance,
}) => {
  const {arrowContainer, arrowStyle} = styles;
  const {t} = useTranslation();
  console.log('Desde componente balance ', balance);

  return (
    <Container flex>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text
          text={t('myAccount:myAccount')}
          typography="h3"
          textAlign="center"
        />
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

      <Container
        flex
        backgroundColor={Theme.Colors.UltralightGrey}
        style={{paddingHorizontal: 16}}>
        <HeaderComponent
          balance={balance}
          onPressUnavailableItem={onPressUnavailableItem}
          fetchingBalance={fetchingBalance}
        />
      </Container>
    </Container>
  );
};

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  balance,
  onPressUnavailableItem,
  fetchingBalance,
}) => {
  const {cardStyle, iconContainer, cardGradient} = styles;
  const {t} = useTranslation();

  // const hideAccountNumbers = accountNumber => {
  //   for (let i = 0; i < accountNumber.length - 3; i++) {
  //     if (accountNumber[i] === '-') {
  //       accountNumber[i] = '';
  //     } else {
  //       accountNumber[i] = '*';
  //     }
  //     console.log('hidden account ', accountNumber);
  //     return accountNumber;
  //   }
  // };
  let balanceCondition =
    balance?.amount.amount === undefined ? '0' : balance.amount.amount;
  let accountNumberCondition =
    balance?.accountNumber === undefined
      ? '**** *** *** 456'
      : balance.accountNumber;

  return (
    <Container>
      <TextContainer
        text={t('myAccount:availableBalance')}
        typography="paragraph"
        textAlign="center"
        marginTop={29}
      />

      {fetchingBalance ? (
        <SkeletonContent
          containerStyle={{
            marginTop: 8,
            alignItems: 'center',
          }}
          isLoading>
          <Container style={{width: 180, height: 35, borderRadius: 35}} />
          <Container
            style={{
              width: '100%',
              height: 200,
              borderRadius: 0,
              marginTop: 30,
              marginBottom: 20,
            }}
          />
        </SkeletonContent>
      ) : (
        <>
          <TextContainer
            text={`$${balanceCondition}`}
            marginTop={4}
            fontWeight="Bold"
            textAlign="center"
            fontSize={34}
          />

          <Container style={cardStyle} height={200}>
            <LinearGradient
              colors={['#626262', '#242424']}
              style={[StyleSheet.absoluteFill, cardGradient]}
            />
            <Container row space="between">
              <Container row>
                <FadeInImage source={AURUM_ICON} width={34} height={28} />
                <TextContainer
                  marginLeft={7}
                  text={t('myAccount:virtualCard')}
                  fontSize={20}
                  fontWeight="Bold"
                  textColor={Theme.Colors.Bright}
                />
              </Container>
              <Container row>
                <View
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 5,
                    backgroundColor: Theme.Colors.Success,
                    alignSelf: 'center',
                    marginTop: 5,
                  }}
                />
                <Text
                  text={t('myAccount:stateCard')}
                  fontSize={16}
                  textColor={Theme.Colors.Bright}
                  alignSelf="flex-end"
                />
              </Container>
            </Container>
            <Container row space="between" style={{marginTop: 24}}>
              <Text
                text={`${accountNumberCondition}`}
                fontSize={19}
                textColor={Theme.Colors.Bright}
              />
              <Text
                text="** / ****"
                fontSize={19}
                textColor={Theme.Colors.Bright}
              />
            </Container>

            <Container
              height={1}
              backgroundColor="#626262"
              style={{
                marginTop: 25,
                marginBottom: 16,
                marginLeft: -20,
                marginRight: -20,
              }}
            />

            <Touchable onPress={onPressUnavailableItem} marginTop={4}>
              <Container row middle>
                <Image
                  source={EYE_ICON_AURUM}
                  style={{width: 22, height: 18}}
                />
                <TextContainer
                  text={t('myAccount:seeData')}
                  fontSize={14}
                  marginLeft={10}
                  textColor={Theme.Colors.Bright}
                />
              </Container>
            </Touchable>
          </Container>
        </>
      )}

      <Container
        row
        space="between"
        style={{marginTop: 14, marginHorizontal: 10}}>
        <Touchable onPress={onPressUnavailableItem}>
          <Container flex width={ICON_CONTAINER_WIDTH}>
            <Container middle style={iconContainer}>
              <Image
                source={ACCOUNT_INFO_ICON}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  marginTop: 10,
                }}
                resizeMode="contain"
              />
              <Text text={t('myAccount:accountInfo')} textAlign="center" />
            </Container>
          </Container>
        </Touchable>

        <Touchable onPress={onPressUnavailableItem}>
          <Container flex width={ICON_CONTAINER_WIDTH}>
            <Container middle style={iconContainer}>
              <Image
                source={DOLLAR_INFO_ICON}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  marginTop: 10,
                }}
                resizeMode="contain"
              />
              <Text text={t('myAccount:payBalance')} textAlign="center" />
            </Container>
          </Container>
        </Touchable>

        <Touchable onPress={onPressUnavailableItem}>
          <Container flex width={ICON_CONTAINER_WIDTH}>
            <Container middle style={iconContainer}>
              <Image
                source={ADD_CARD_ICON}
                style={{
                  width: 20,
                  height: 20,
                  marginBottom: 10,
                  marginTop: 10,
                }}
                resizeMode="contain"
              />
              <Text text={t('myAccount:requestCard')} textAlign="center" />
            </Container>
          </Container>
        </Touchable>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingTop: 30,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderWidth: 0,
    marginTop: 25,
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  cardGradient: {
    borderRadius: 16,
  },
  iconContainer: {
    width: '100%',
    height: 80,
    backgroundColor: Theme.Colors.Bright,
    marginBottom: 4,
    borderRadius: 8,
    paddingBottom: 8,
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

export default MyAccountScreen;
