/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react-native';
import { useForm } from 'react-hook-form';
import { Input } from '../index';

// eslint-disable-next-line max-len
const uri = 'https://static.wikia.nocookie.net/lossimpson/images/b/bd/Homer_Simpson.png/revision/latest?cb=20100522180809&path-prefix=es';

jest.mock('react-native-collapsible', () => ({}));

const WrapperInput = (props: any) => {
  const { control } = useForm();

  return (
    <Input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      testID="input-atom"
      control={control}
      name="test"
    />
  );
};

describe('Input Component', () => {
  it('Input Atom rendered successful', () => {
    const { queryByTestId } = render(<WrapperInput />);

    expect(queryByTestId('input-atom')).toBeTruthy();
  });

  it('Input Atom shows label correctly', () => {
    const { queryByTestId } = render(<WrapperInput label="Test Label" />);

    const label = queryByTestId('input-atom-label')?.props.children;

    expect(label).toBe('Test Label');
  });

  it('Input Atom shows placeholder correctly', () => {
    const { queryByTestId } = render(<WrapperInput placeholder="Test Placeholder" />);

    const placeholder = queryByTestId('input-atom-input')?.props?.placeholder;

    expect(placeholder).toBe('Test Placeholder');
  });

  it('Input Atom passwordField prop works correctly', () => {
    const { queryByTestId } = render(<WrapperInput passwordField />);

    const secureTextEntry = queryByTestId('input-atom-input')?.props?.secureTextEntry;

    expect(secureTextEntry).toBeTruthy();
  });

  it('Input Atom passwordField prop works correctly', () => {
    const { getByTestId } = render(<WrapperInput passwordField />);

    const secureTextEntry = getByTestId('input-atom-input')?.props?.secureTextEntry;

    expect(secureTextEntry).toBeTruthy();
    expect(getByTestId('input-atom-hide-password')).toBeTruthy();
  });

  it('Input Atom showPasswordEnable prop works correctly', () => {
    const { queryByTestId } = render(<WrapperInput passwordField showPasswordEnable={false} />);

    expect(queryByTestId('input-atom-hide-password')).toBeNull();
  });

  it('Input Atom error prop works correctly', () => {
    const { queryByTestId } = render(<WrapperInput error="Test Error" />);

    expect(queryByTestId('input-atom-error-label')).toBeTruthy();
    expect(queryByTestId('input-atom-error-image')).toBeTruthy();
  });

  it('Input Atom prefixImage prop works correctly', () => {
    const { queryByTestId } = render(<WrapperInput prefixImage={{ uri }} />);

    expect(queryByTestId('input-atom-prefix-image')).toBeTruthy();
  });

  it('Input Atom centerElements prop works correctly', () => {
    const { getByTestId } = render(<WrapperInput centerElements error="Test Error" />);

    const errorStyle = getByTestId('input-atom-error-label').props.style[1];
    const centerError = errorStyle.textAlign === 'center';

    expect(centerError).toBeTruthy();

    const inputStyle = getByTestId('input-atom-input').props.style[1];
    const centerInput = inputStyle.textAlign === 'center';

    expect(centerInput).toBeTruthy();
  });
});
