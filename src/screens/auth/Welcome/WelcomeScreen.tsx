import {Container, Text} from '../../../components/atoms';
import {TextContainer} from '../../../components';
import {Button} from '../../../components/molecules';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {Dimensions, Image, ScrollView, StyleSheet} from 'react-native';
import {LOGO, CELL_AURUM} from '../../../assets/images';
import {useTranslation} from 'react-i18next';
import Theme from '../../../theme';

const BUTTON_WIDTH = Dimensions.get('window').width - 16 * 2;
interface Props {
  onPressedFinish: () => void;

  // prop?: string
}

const WelcomeScreen: React.FC<Props> = ({onPressedFinish}) => {
  const {ContainerStyle} = styles;
  const insets = useSafeAreaInsets();
  const {t} = useTranslation();

  return (
    <Container
      flex
      style={{paddingTop: 5, paddingBottom: insets.bottom}}
      backgroundColor={Theme.Colors.UltralightGrey}>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          alignItems: 'center',
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <Image
          source={LOGO}
          style={{
            width: 150,
            height: 80,
            alignSelf: 'center',
            marginBottom: 15,
            marginTop: 5,
          }}
          resizeMode="contain"
        />
        <Text
          text={t('welcome:welcomeAurumCore')}
          textAlign="center"
          typography="h3"
        />
        <Image
          source={CELL_AURUM}
          style={{
            paddingTop: 300,
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Container
          flex
          style={ContainerStyle}
          backgroundColor={Theme.Colors.Background}>
          <TextContainer
            text={t('welcome:accountCreated')}
            textAlign="center"
            typography="h4"
            marginBottom={10}
          />
          <TextContainer
            text={t('welcome:clickOnConclude')}
            textAlign="center"
            typography="h5"
            marginBottom={60}
            marginHorizontal={60}
          />
          <Button
            label={t('welcome:conclude')}
            onPress={onPressedFinish}
            width={BUTTON_WIDTH}
            marginHorizontal={15}
          />
        </Container>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  ContainerStyle: {
    paddingTop: 50,
    paddingBottom: 10,
    marginBottom: -50,
    borderRadius: 30,
  },
});

export default WelcomeScreen;
