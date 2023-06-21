/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TextStyle } from 'react-native';
import { render } from '@testing-library/react-native';
import Theme from 'theme';
import { CustomText } from '../index';

describe('Text Component', () => {
  it('Text Atom rendered successful', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="" />);

    expect(queryByTestId('text-atom')).toBeTruthy();
  });

  it('Text Atom shows text correctly', () => {
    const { getByTestId } = render(<CustomText testID="text-atom" text="Testing" />);
    const text = getByTestId('text-atom').children[0];

    expect(text).toBe('Testing');
  });

  it('Text Atom fontSize prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" fontSize={20} />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[0];

    const fontSize = !!defaultStyles.find((item: TextStyle) => item.fontSize === 20);

    expect(fontSize).toBeTruthy();
  });

  it('Text Atom fontWeight prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" fontWeight="Bold" />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[0];

    const fontWeight = !!defaultStyles.find((item: TextStyle) => item.fontFamily === 'NotoSansJP-Bold');

    expect(fontWeight).toBeTruthy();
  });

  it('Text Atom textColor prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" textColor="#000" />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[0];

    const textColor = !!defaultStyles.find((item: TextStyle) => item.color === '#000');

    expect(textColor).toBeTruthy();
  });

  it('Text Atom typography prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" typography="h4" />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[0];

    const typography = !!defaultStyles.find(
      (item: TextStyle) => item.fontSize === Theme.Sizes.H4
        && item.fontFamily === Theme.Fonts.Bold
        && item.color === Theme.Colors.Black
    );

    expect(typography).toBeTruthy();
  });

  it('Text Atom textAlign prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" textAlign="justify" />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.textAlign).toBe('justify');
  });

  it('Text Atom transform prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" transform="capitalize" />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.textTransform).toBe('capitalize');
  });

  it('Text Atom underline prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" underline />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.textDecorationLine).toBe('underline');
  });

  it('Text Atom spacing prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" spacing={5} />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.letterSpacing).toBe(5);
  });

  it('Text Atom lineHeight prop works correctly', () => {
    const { queryByTestId } = render(<CustomText testID="text-atom" text="Testing" lineHeight={20} />);

    const element = queryByTestId('text-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.lineHeight).toBe(20);
  });
});
