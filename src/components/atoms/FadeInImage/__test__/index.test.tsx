/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react-native';
import { FadeInImage } from '../index';

// eslint-disable-next-line max-len
const uri = 'https://static.wikia.nocookie.net/lossimpson/images/b/bd/Homer_Simpson.png/revision/latest?cb=20100522180809&path-prefix=es';

describe('FadeInImage Component', () => {
  it('FadeInImage Atom rendered successful', () => {
    const { queryByTestId } = render(<FadeInImage testID="fadeInImage-atom" source={{ uri }} />);

    expect(queryByTestId('fadeInImage-atom')).toBeTruthy();
  });

  it('FadeInImage Atom fadeIn prop works correctly', async () => {
    const { queryByTestId } = render(<FadeInImage testID="fadeInImage-atom" source={{ uri }} fadeIn={false} />);

    expect(queryByTestId('fadeInImage-atom-static')).toBeTruthy();
  });

  it('FadeInImage Atom width prop works correctly', async () => {
    const { queryByTestId } = render(<FadeInImage testID="fadeInImage-atom" source={{ uri }} width={100} />);

    const element = queryByTestId('fadeInImage-atom');
    const defaultStyles = element?.props.style[0];

    const width = defaultStyles.width === 100;

    expect(width).toBeTruthy();
  });

  it('FadeInImage Atom height prop works correctly', async () => {
    const { queryByTestId } = render(<FadeInImage testID="fadeInImage-atom" source={{ uri }} height={100} />);

    const element = queryByTestId('fadeInImage-atom');
    const defaultStyles = element?.props.style[0];

    const height = defaultStyles.height === 100;

    expect(height).toBeTruthy();
  });

  it('FadeInImage Atom borderRadius prop works correctly', async () => {
    const { queryByTestId } = render(<FadeInImage testID="fadeInImage-atom" source={{ uri }} borderRadius={20} />);

    const element = queryByTestId('fadeInImage-atom');
    const defaultStyles = element?.props.style[0];

    const borderRadius = defaultStyles.borderRadius === 20;

    expect(borderRadius).toBeTruthy();
  });

  it('FadeInImage Atom style prop works correctly', () => {
    const { queryByTestId } = render(<FadeInImage testID="fadeInImage-atom" source={{ uri }} style={{}} />);

    const element = queryByTestId('fadeInImage-atom');
    const style = element?.props.style[1];

    expect(style).toBeDefined();
  });
});
