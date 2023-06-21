/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { ViewStyle } from 'react-native';
import { render } from '@testing-library/react-native';
import { Container } from '../index';

const HEIGHT = 20;
const WIDTH = 20;

describe('Container Component', () => {
  it('Container Atom rendered successful', () => {
    const { queryByTestId } = render(<Container testID="container-atom" />);

    expect(queryByTestId('container-atom')).toBeTruthy();
  });

  it('Container Atom useKeyboard prop works successful', () => {
    const { queryByTestId } = render(<Container testID="container-atom" useKeyboard />);

    expect(queryByTestId('container-atom-keyboard')).toBeTruthy();
  });

  it('Container Atom row prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" row />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const row = !!defaultStyles.find((item: ViewStyle) => item.flexDirection === 'row');

    expect(row).toBeTruthy();
  });

  it('Container Atom alignment prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" alignment="start" />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const alignment = !!defaultStyles.find((item: ViewStyle) => item.justifyContent === 'flex-start');

    expect(alignment).toBeTruthy();
  });

  it('Container Atom backgroundColor prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" backgroundColor="#000" />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const backgroundColor = !!defaultStyles.find((item: ViewStyle) => item.backgroundColor === '#000');

    expect(backgroundColor).toBeTruthy();
  });

  it('Container Atom center prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" center />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const center = !!defaultStyles.find((item: ViewStyle) => item.alignItems === 'center');

    expect(center).toBeTruthy();
  });

  it('Container Atom crossAlignment prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" crossAlignment="end" />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const crossAlignment = !!defaultStyles.find((item: ViewStyle) => item.alignItems === 'flex-end');

    expect(crossAlignment).toBeTruthy();
  });

  it('Container Atom crossCenter prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" crossCenter />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const crossCenter = !!defaultStyles.find((item: ViewStyle) => item.justifyContent === 'center');

    expect(crossCenter).toBeTruthy();
  });

  it('Container Atom flex prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" flex />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const flex = !!defaultStyles.find((item: ViewStyle) => item.flex === 1);

    expect(flex).toBeTruthy();
  });

  it('Container Atom height prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" height={HEIGHT} />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const height = !!defaultStyles.find((item: ViewStyle) => item.height === HEIGHT);

    expect(height).toBeTruthy();
  });

  it('Container Atom middle prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" middle />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const middle = !!defaultStyles.find(
      (item: ViewStyle) => item.justifyContent === 'center' && item.alignItems === 'center'
    );

    expect(middle).toBeTruthy();
  });

  it('Container Atom space prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" space="evenly" />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const space = !!defaultStyles.find((item: ViewStyle) => item.justifyContent === 'space-evenly');

    expect(space).toBeTruthy();
  });

  it('Container Atom width prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" width={WIDTH} />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const width = !!defaultStyles.find((item: ViewStyle) => item.width === WIDTH);

    expect(width).toBeTruthy();
  });

  it('Container Atom circle prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" width={WIDTH} height={HEIGHT} circle />);

    const element = queryByTestId('container-atom');
    const defaultStyles = element?.props.style[0];

    const circle = !!defaultStyles.find((item: ViewStyle) => item.borderRadius === WIDTH + HEIGHT);

    expect(circle).toBeTruthy();
  });

  it('Container Atom style prop works correctly', () => {
    const { queryByTestId } = render(<Container testID="container-atom" style={{}} />);

    const element = queryByTestId('container-atom');
    const style = element?.props.style[1];

    expect(style).toBeDefined();
  });
});
