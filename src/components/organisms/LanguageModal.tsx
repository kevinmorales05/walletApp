import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Container, Modal, Text} from '../../components/atoms';
import {useTranslation} from 'react-i18next';
import Theme from '../../theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../../components/molecules';

interface Props {
  visible: boolean;
  onContinue: () => void;
  onSwitch: () => void;
}

const LanguageModal: React.FC<Props> = ({visible, onContinue, onSwitch}) => {
  const {containerStyle} = styles;
  const {t} = useTranslation();

  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible}>
      <Container flex alignment="end">
        <TouchableOpacity
          activeOpacity={1}
          style={{...containerStyle, paddingBottom: insets.bottom + 16}}>
          <Text
            text={t('languageModal:title', {
              language: t(`languageModal:${t('language:tag')}`),
            })}
            textAlign="center"
            typography="h4"
          />

          <Container style={{paddingHorizontal: 32}}>
            <Button
              label={t('languageModal:continue', {
                language: t(`languageModal:${t('language:tag')}`),
              })}
              onPress={onContinue}
              marginTop={32}
            />

            <Button
              label={t('languageModal:switch', {
                language: t(
                  `languageModal:${t('language:tag') === 'es' ? 'en' : 'es'}`,
                ),
              })}
              onPress={onSwitch}
              variant="gray"
              marginTop={16}
            />
          </Container>
        </TouchableOpacity>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Theme.Colors.Bright,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    padding: 16,
  },
});

export {LanguageModal};
