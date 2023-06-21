/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react-native';
import { Container } from 'components/atoms/Container';
import { SafeArea } from '../index';

const BACKGROUND_COLOR = '#000';

describe('SafeArea Component', () => {
  it('SafeArea Atom rendered successful', () => {
    const { queryByTestId } = render(
      <SafeArea testID="safeArea-atom">
        <Container />
      </SafeArea>
    );

    expect(queryByTestId('safeArea-atom')).toBeTruthy();
    expect(queryByTestId('safeArea-atom-container')).toBeTruthy();
    expect(queryByTestId('safeArea-atom-component')).toBeTruthy();
    expect(queryByTestId('safeArea-atom-top')).toBeTruthy();
    expect(queryByTestId('safeArea-atom-bottom')).toBeTruthy();
  });

  it('SafeArea Atom topSafeArea prop works correctly', () => {
    const { queryByTestId } = render(
      <SafeArea testID="safeArea-atom" topSafeArea={false}>
        <Container />
      </SafeArea>
    );

    expect(queryByTestId('safeArea-atom-top')).toBeFalsy();
  });

  it('SafeArea Atom bottomSafeArea prop works correctly', () => {
    const { queryByTestId } = render(
      <SafeArea testID="safeArea-atom" bottomSafeArea={false}>
        <Container />
      </SafeArea>
    );

    expect(queryByTestId('safeArea-atom-bottom')).toBeFalsy();
  });

  it('SafeArea Atom topBGColor prop works correctly', () => {
    const { getByTestId } = render(
      <SafeArea testID="safeArea-atom" topBGColor={BACKGROUND_COLOR}>
        <Container />
      </SafeArea>
    );

    const element = getByTestId('safeArea-atom-top');
    const style = element?.props.style;

    const topBGColor = style.backgroundColor === BACKGROUND_COLOR;

    expect(topBGColor).toBeTruthy();
  });

  it('SafeArea Atom bottomBGColor prop works correctly', () => {
    const { getByTestId } = render(
      <SafeArea testID="safeArea-atom" bottomBGColor={BACKGROUND_COLOR}>
        <Container />
      </SafeArea>
    );

    const element = getByTestId('safeArea-atom-bottom');
    const style = element?.props.style;

    const bottomBGColor = style.backgroundColor === BACKGROUND_COLOR;

    expect(bottomBGColor).toBeTruthy();
  });

  it('SafeArea Atom backgroundColor prop works correctly', () => {
    const { getByTestId } = render(
      <SafeArea testID="safeArea-atom" backgroundColor={BACKGROUND_COLOR}>
        <Container />
      </SafeArea>
    );

    const backgroundColor = getByTestId('safeArea-atom-children')?.props.style[1].backgroundColor === BACKGROUND_COLOR;
    const topBackgroundColor = getByTestId('safeArea-atom-top')?.props.style.backgroundColor === BACKGROUND_COLOR;
    const bottomBackgroundColor = getByTestId('safeArea-atom-bottom')?.props.style.backgroundColor === BACKGROUND_COLOR;

    expect(backgroundColor).toBeTruthy();
    expect(topBackgroundColor).toBeTruthy();
    expect(bottomBackgroundColor).toBeTruthy();
  });
});
