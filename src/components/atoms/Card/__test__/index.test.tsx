/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { Container } from 'components/atoms/Container';
import { Card } from '../index';

describe('Card Component', () => {
  it('Card Atom rendered successful', () => {
    const { queryByTestId } = render(
      <Card testID="card-atom">
        <Container />
      </Card>
    );

    expect(queryByTestId('card-atom')).toBeTruthy();
  });

  it('Card Atom onPress works correctly', async () => {
    const onPressMock = jest.fn();

    const { getByTestId } = render(
      <Card testID="card-atom" onPress={onPressMock}>
        <Container />
      </Card>
    );

    await act(async () => fireEvent.press(getByTestId('card-atom-touchable')));

    expect(onPressMock).toBeCalledTimes(1);
  });
});
