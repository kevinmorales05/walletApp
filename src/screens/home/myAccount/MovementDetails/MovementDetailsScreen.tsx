import {
  ARROW_LEFT_BLACK_ICON,
  DROP_WHITE_ICON,
} from '../../../../assets/images';
import {Button, Card, Container, Text, Touchable} from '../../../../components';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image, ScrollView, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {TransactionType} from '../../../../reactRedux';
import Theme from '../../../../theme';
import {formatDate} from '../../../../utils';

interface Props {
  onPressBack: () => void;
  movement: TransactionType;
}

const MovementDetailsScreen: React.FC<Props> = ({onPressBack, movement}) => {
  const {arrowContainer, arrowStyle, iconContainer} = styles;
  const {t} = useTranslation();

  return (
    <Container flex>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text
          text={t('movementDetails:movementDetails')}
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

      <ScrollView
        style={{flex: 1, backgroundColor: Theme.Colors.UltralightGrey}}
        contentContainerStyle={{padding: 16}}
        bounces={false}>
        <Card
          column
          style={{
            marginTop: 30,
            paddingTop: 24,
            paddingBottom: 32,
            paddingHorizontal: 18,
          }}>
          <Container width={45} height={45} circle middle style={iconContainer}>
            <LinearGradient
              style={StyleSheet.absoluteFill}
              colors={Theme.Colors.ButtonBlackGradient}
            />
            <Image
              source={DROP_WHITE_ICON}
              style={{width: 24, height: 24}}
              resizeMode="contain"
            />
          </Container>
          <Text text={movement.type} typography="h4" textAlign="center" />
          <Container row space="between" style={{marginTop: 24}}>
            <Text
              text={`${t('movementDetails:type')}:`}
              fontSize={14}
              fontWeight="Bold"
              textColor={Theme.Colors.BluishGrey}
            />
            <Text text={movement.type} textAlign="right" fontSize={14} />
          </Container>

          <Container row space="between" style={{marginTop: 24}}>
            <Text
              text={`${t('movementDetails:amount')}:`}
              fontSize={14}
              fontWeight="Bold"
              textColor={Theme.Colors.BluishGrey}
            />
            <Text
              text={`${movement.amount < 0 ? '-$' : '$'}${Math.abs(
                movement.amount,
              ).toFixed(2)}`}
              textAlign="right"
              fontSize={14}
            />
          </Container>

          <Container row space="between" style={{marginTop: 24}}>
            <Text
              text={`${t('movementDetails:date')}:`}
              fontSize={14}
              fontWeight="Bold"
              textColor={Theme.Colors.BluishGrey}
            />
            <Text
              text={formatDate(new Date(movement.date), 'P hh:mm aaa')}
              textAlign="right"
              fontSize={14}
            />
          </Container>

          <Container row space="between" style={{marginTop: 24}}>
            <Text
              text={`${t('movementDetails:authorization')}:`}
              fontSize={14}
              fontWeight="Bold"
              textColor={Theme.Colors.BluishGrey}
            />
            <Container flex>
              <Text text={movement.id} textAlign="right" fontSize={14} />
            </Container>
          </Container>

          <Container
            style={{marginTop: 36}}
            width="100%"
            height={1}
            backgroundColor={Theme.Colors.LightGrey}
          />

          <Button
            label={t('movementDetails:consult')}
            onPress={() => {}}
            variant="custom"
            backgroundColor={Theme.Colors.Bright}
            borderColor={Theme.Colors.Text}
            borderWidth={2}
            textColor={Theme.Colors.Text}
            marginTop={32}
            marginBottom={16}
          />

          <Text
            text={t('movementDetails:consultMsg')}
            typography="label"
            textAlign="center"
          />
        </Card>

        <Button
          label={t('movementDetails:requestClarification')}
          onPress={() => {}}
          marginVertical={32}
        />
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
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
  iconContainer: {
    position: 'absolute',
    top: -30,
    alignSelf: 'center',
  },
});

export default MovementDetailsScreen;
