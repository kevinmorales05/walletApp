import React, {ForwardedRef, forwardRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {
  AddresseePage,
  AmountPage,
  Card,
  ConceptPage,
  Container,
  Stepper,
  Text,
  Touchable,
} from '../../../../components';
import {CARD_ICON, CROSS_ICON} from '../../../../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import Theme from '../../../../theme';
import PagerView from 'react-native-pager-view';

interface Props {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onPressBack: () => void;
  onPressNewAddressee: () => void;
  goBack: (index: number) => void;
  onSelectAddressee: () => void;
  onSelectAmount: (amount: string) => void;
  amount: string;
  onSelectConcept: (concept: string) => void;
  balance: string;
}

const SendMoneyScreen = forwardRef(
  (
    {
      currentIndex,
      setCurrentIndex,
      onPressBack,
      onPressNewAddressee,
      goBack,
      onSelectAddressee,
      onSelectAmount,
      amount,
      onSelectConcept,
      balance,
    }: Props,
    ref: ForwardedRef<PagerView>,
  ) => {
    const {crossContainer, crossStyle} = styles;
    const {t} = useTranslation();

    return (
      <Container flex style={{paddingTop: 11}}>
        <Text
          text={t('addressee:sendMoney')}
          typography="h3"
          textAlign="center"
        />
        <Container style={crossContainer}>
          <Touchable onPress={onPressBack} rounded>
            <Image source={CROSS_ICON} style={crossStyle} />
          </Touchable>
        </Container>

        <Stepper
          currentStep={currentIndex + 1}
          totalSteps={3}
          marginVertical={16}
        />

        <Card style={{marginHorizontal: 16, marginBottom: 16}}>
          <Container width={45} height={45} middle>
            <LinearGradient
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: 45,
              }}
              colors={Theme.Colors.ButtonPrimaryGradient}
            />
            <Image
              source={CARD_ICON}
              style={{width: 24, height: 24}}
              resizeMode="contain"
            />
          </Container>
          <Container flex space="between" style={{paddingHorizontal: 16}}>
            <Text text={t('addressee:myAccount')} typography="paragraph" />
            <Text text="**** 9102" typography="h4" />
          </Container>
          <Container crossCenter>
            <Text text={`$${balance}`} typography="h2" />
          </Container>
        </Card>

        <PagerView
          ref={ref}
          style={{flex: 1}}
          initialPage={0}
          onPageSelected={({nativeEvent: {position}}) =>
            setCurrentIndex(position)
          }
          keyboardDismissMode="on-drag"
          scrollEnabled={false}>
          <View key="p1">
            <AddresseePage
              onSelect={onSelectAddressee}
              onPressNewAddressee={onPressNewAddressee}
            />
          </View>
          <View key="p2">
            <AmountPage
              onPressChange={() => goBack(0)}
              onSubmit={onSelectAmount}
              balance={Number(balance)}
            />
          </View>
          <View key="p3">
            <ConceptPage
              amount={amount}
              onPressChange={goBack}
              onSubmit={onSelectConcept}
            />
          </View>
        </PagerView>
      </Container>
    );
  },
);

const styles = StyleSheet.create({
  crossContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  crossStyle: {
    width: 15,
    height: 22,
    marginVertical: 13,
    marginHorizontal: 16,
  },
});

export default SendMoneyScreen;
