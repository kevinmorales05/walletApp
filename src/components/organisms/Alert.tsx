import React from 'react';
import {useTranslation} from 'react-i18next';

import Theme from '../../theme';
import {Container} from '../atoms';
import {ModalCard, TextContainer, TouchableText} from '../molecules';

export interface AlertDataInterface {
  title: string;
  message?: string;
  acceptTitle?: string;
  cancelTitle?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}

interface Props {
  visible: boolean;
  data: AlertDataInterface;
  onDismiss?: () => void;
}

const Alert: React.FC<Props> = ({
  visible,
  data: {title, message = '', onAccept, onCancel, acceptTitle, cancelTitle},
  onDismiss,
}: Props) => {
  const {t} = useTranslation();

  return (
    <ModalCard visible={visible} onDismiss={onDismiss}>
      <TextContainer
        text={title}
        fontSize={Theme.Sizes.Button}
        fontWeight="Regular"
        marginTop={12}
      />
      {message !== '' && (
        <TextContainer
          text={message}
          typography="h2"
          textColor={Theme.Colors.Black}
          marginTop={8}
        />
      )}
      <Container row alignment="end" style={{marginTop: 20}}>
        {onCancel && (
          <TouchableText
            text={cancelTitle || t('global:cancel')}
            onPress={onCancel}
          />
        )}
        {onAccept && (
          <TouchableText
            text={acceptTitle || t('global:accept')}
            onPress={onAccept}
          />
        )}
      </Container>
    </ModalCard>
  );
};

export {Alert};
