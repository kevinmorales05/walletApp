import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet} from 'react-native';

import Theme from '../../theme';
import {Container, Modal, Text} from '../atoms';

export interface LoadingInterface {
  visible: boolean;
  message?: string;
}

const Loading: React.FC<LoadingInterface> = ({
  visible,
  message,
}: LoadingInterface) => {
  const {modalBg, absoluteView} = styles;

  return (
    <Modal visible={visible}>
      <Container style={modalBg}>
        <Container center style={absoluteView}>
          <SafeAreaView />
        </Container>
        <Container flex middle>
          <ActivityIndicator size="large" />
          {message && (
            <Container style={{marginTop: 8}}>
              <Text
                text={message}
                textAlign="center"
                typography="h2"
                fontWeight="Regular"
                textColor={Theme.Colors.Black}
              />
              <SafeAreaView />
            </Container>
          )}
        </Container>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBg: {
    width: '100%',
    height: '100%',
  },
  absoluteView: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

export {Loading};
