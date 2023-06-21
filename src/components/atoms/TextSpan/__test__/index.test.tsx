/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { TextStyle } from 'react-native';
import { render } from '@testing-library/react-native';
import Theme from 'theme';
import { TextSpan } from '../index';

describe('TextSpan Component', () => {
  it('TextSpan Atom rendered successful', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="" />);

    expect(queryByTestId('textSpan-atom')).toBeTruthy();
  });

  it('TextSpan Atom shows text correctly', () => {
    const { getByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" />);
    const text = getByTestId('textSpan-atom').children[0];

    expect(text).toBe('Testing');
  });

  it('TextSpan Atom fontSize prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" fontSize={20} />);

    const element = queryByTestId('textSpan-atom');
    const style = element?.props.style[1];

    const fontSize = style.fontSize === 20;

    expect(fontSize).toBeTruthy();
  });

  it('TextSpan Atom fontWeight prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" fontWeight="Bold" />);

    const element = queryByTestId('textSpan-atom');
    const style = element?.props.style[1];

    const fontWeight = style.fontFamily === 'NotoSansJP-Bold';

    expect(fontWeight).toBeTruthy();
  });

  it('TextSpan Atom textColor prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" textColor="#000" />);

    const element = queryByTestId('textSpan-atom');
    const style = element?.props.style[1];

    const textColor = style.color === '#000';

    expect(textColor).toBeTruthy();
  });

  it('TextSpan Atom typography prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" typography="h4" />);

    const element = queryByTestId('textSpan-atom');
    const style = element?.props.style[0];

    const typography = style.fontSize === Theme.Sizes.H4
      && style.fontFamily === Theme.Fonts.Bold
      && style.color === Theme.Colors.Black;

    expect(typography).toBeTruthy();
  });

  it('TextSpan Atom textAlign prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" textAlign="justify" />);

    const element = queryByTestId('textSpan-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.textAlign).toBe('justify');
  });

  it('TextSpan Atom transform prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" transform="capitalize" />);

    const element = queryByTestId('textSpan-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.textTransform).toBe('capitalize');
  });

  it('TextSpan Atom underline prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" underline />);

    const element = queryByTestId('textSpan-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.textDecorationLine).toBe('underline');
  });

  it('TextSpan Atom spacing prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" spacing={5} />);

    const element = queryByTestId('textSpan-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.letterSpacing).toBe(5);
  });

  it('TextSpan Atom lineHeight prop works correctly', () => {
    const { queryByTestId } = render(<TextSpan testID="textSpan-atom" text="Testing" lineHeight={20} />);

    const element = queryByTestId('textSpan-atom');
    const defaultStyles = element?.props.style[1];

    expect(defaultStyles.lineHeight).toBe(20);
  });

  it('TextSpan Atom children rendered successful', () => {
    const { queryByTestId } = render(
      <TextSpan testID="textSpan-atom">
        <TextSpan testID="textSpan-children" />
      </TextSpan>
    );

    expect(queryByTestId('textSpan-atom')).toBeTruthy();
    expect(queryByTestId('textSpan-children')).toBeTruthy();
  });
});
