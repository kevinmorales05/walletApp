/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { Container } from 'components/atoms/Container';
import { CustomModal } from '../index';

describe('Modal Component', () => {
  it('Modal Atom rendered successful', () => {
    const { queryByTestId } = render(
      <CustomModal testID="modal-atom" visible>
        <Container />
      </CustomModal>
    );

    expect(queryByTestId('modal-atom')).toBeTruthy();
  });

  it('Modal Atom onDismiss calls successful', async () => {
    const onDismiss = jest.fn();

    const { getByTestId } = render(
      <CustomModal testID="modal-atom" visible onDismiss={onDismiss}>
        <Container />
      </CustomModal>
    );

    await act(async () => fireEvent.press(getByTestId('modal-atom-touchable')));

    expect(onDismiss).toBeCalledTimes(1);
  });
});
