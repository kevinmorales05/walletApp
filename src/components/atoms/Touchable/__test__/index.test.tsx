/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import { Container } from 'components/atoms/Container';
import { Touchable } from '../index';

const onPressMock = jest.fn();

describe('Touchable Component', () => {
  beforeEach(() => {
    onPressMock.mockClear();
  });

  it('Touchable Atom rendered successful', () => {
    const { queryByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock}>
        <Container />
      </Touchable>
    );

    expect(queryByTestId('touchable-atom')).toBeTruthy();
  });

  it('Touchable Atom onPress works correctly', async () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock}>
        <Container />
      </Touchable>
    );

    await act(async () => fireEvent.press(getByTestId('touchable-atom')));

    expect(onPressMock).toBeCalledTimes(1);
  });

  it('Touchable Atom disable prop works correctly', async () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled>
        <Container />
      </Touchable>
    );

    await act(async () => fireEvent.press(getByTestId('touchable-atom')));

    expect(onPressMock).toBeCalledTimes(0);
  });

  it('Touchable Atom marginTop prop works correctly', () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled marginTop={8}>
        <Container />
      </Touchable>
    );

    const element = getByTestId('touchable-atom');
    const style = element?.props.style;

    const marginTop = style.marginTop === 8;

    expect(marginTop).toBeTruthy();
  });

  it('Touchable Atom marginBottom prop works correctly', () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled marginBottom={8}>
        <Container />
      </Touchable>
    );

    const element = getByTestId('touchable-atom');
    const style = element?.props.style;

    const marginBottom = style.marginBottom === 8;

    expect(marginBottom).toBeTruthy();
  });

  it('Touchable Atom marginLeft prop works correctly', () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled marginLeft={8}>
        <Container />
      </Touchable>
    );

    const element = getByTestId('touchable-atom');
    const style = element?.props.style;

    const marginLeft = style.marginLeft === 8;

    expect(marginLeft).toBeTruthy();
  });

  it('Touchable Atom marginRight prop works correctly', () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled marginRight={8}>
        <Container />
      </Touchable>
    );

    const element = getByTestId('touchable-atom');
    const style = element?.props.style;

    const marginRight = style.marginRight === 8;

    expect(marginRight).toBeTruthy();
  });

  it('Touchable Atom marginVertical prop works correctly', () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled marginVertical={8}>
        <Container />
      </Touchable>
    );

    const element = getByTestId('touchable-atom');
    const style = element?.props.style;

    const marginVertical = style.marginVertical === 8;

    expect(marginVertical).toBeTruthy();
  });

  it('Touchable Atom marginHorizontal prop works correctly', () => {
    const { getByTestId } = render(
      <Touchable testID="touchable-atom" onPress={onPressMock} disabled marginHorizontal={8}>
        <Container />
      </Touchable>
    );

    const element = getByTestId('touchable-atom');
    const style = element?.props.style;

    const marginHorizontal = style.marginHorizontal === 8;

    expect(marginHorizontal).toBeTruthy();
  });
});
