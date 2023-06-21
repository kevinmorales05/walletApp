import React, {ReactElement} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Theme from '../../theme';
import {Container, Modal, Text, Touchable} from '../atoms';
import {CustomModalProps} from '../atoms/CustomModal';

interface Props extends CustomModalProps {
  padding?: ViewStyle['padding'];
  closeComponent?: ReactElement;
  renderCloseComponent?: boolean;
}

const ModalCard: React.FC<Props> = ({
  visible,
  children,
  onDismiss,
  padding = 24,
  closeComponent,
  renderCloseComponent = true,
}: Props) => {
  const {modalCenterCardStyle, closeContainer} = styles;

  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <Container flex middle>
        <TouchableOpacity activeOpacity={1}>
          <Container
            style={[
              modalCenterCardStyle,
              {
                padding,
                backgroundColor: Theme.Colors.Bright,
              },
            ]}>
            {children}
            {onDismiss && renderCloseComponent && (
              <Container style={closeContainer}>
                <Touchable
                  effectEnable={!!closeComponent}
                  onPress={onDismiss}
                  hitSlop={16}>
                  {closeComponent || (
                    <Container flex middle>
                      <Text text="X" />
                    </Container>
                  )}
                </Touchable>
              </Container>
            )}
          </Container>
        </TouchableOpacity>
      </Container>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalCenterCardStyle: {
    backgroundColor: Theme.Colors.Bright,
    borderRadius: 10,
    minWidth: '85%',
    width: '85%',
  },
  closeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export {ModalCard};
