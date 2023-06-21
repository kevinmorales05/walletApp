import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {LOGO, MENU_ICON, PENCIL_AND_RULER} from '../../../assets/images';
import {
  Button,
  Container,
  FadeInImage,
  TextContainer,
  Touchable,
} from '../../../components';
import Theme from '../../../theme';

interface Props {
  onPressMenu: () => void;
  onPressHome: () => void;
}

const UnderConstructionScreen: React.FC<Props> = ({
  onPressMenu,
  onPressHome,
}) => {
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
      <Container style={styles.messageContainerStyle}>
        <Image source={PENCIL_AND_RULER} style={styles.iconStyle} />
        <TextContainer
          text={t('underConstruction:underConstruction')}
          typography="h4"
          textAlign="justify"
          marginBottom={20}
        />
        <TextContainer
          text={t('underConstruction:workingSection')}
          typography="label"
          textAlign="justify"
        />
        <TextContainer
          text={t('underConstruction:sorryInconvenience')}
          typography="label"
          textAlign="justify"
          marginBottom={50}
        />
      </Container>
      <Container style={styles.buttonContainerStyle}>
        <Container
          style={{
            alignContent: 'space-between',
            paddingHorizontal: 50,
            marginHorizontal: 100,
          }}>
          <Button
            label={t('underConstruction:goHome')}
            variant="gray"
            onPress={onPressHome}
            marginHorizontal={10}
          />
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
  iconStyle: {
    width: 60,
    height: 60,
    tintColor: Theme.Colors.BluishGrey,
    marginBottom: 20,
  },
  buttonContainerStyle: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 20,
  },
  messageContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
});

export default UnderConstructionScreen;
