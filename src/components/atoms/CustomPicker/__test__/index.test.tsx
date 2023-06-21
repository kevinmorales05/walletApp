/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { render } from '@testing-library/react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useForm } from 'react-hook-form';
import { CustomPicker } from '../index';

jest.mock('react-native-collapsible', () => ({}));
jest.mock('react-native-raw-bottom-sheet', () => ({
  ...jest.requireActual('react-native-raw-bottom-sheet'),
  onOpen: jest.fn()
}));

const setModalVisible = jest.spyOn(RBSheet.prototype, 'setModalVisible');

const WrapperPicker = (props: any) => {
  const { control } = useForm();

  return (
    <CustomPicker
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      testID="picker-atom"
      control={control}
      name="test"
      options={['option 1', 'option 2']}
      onSelect={() => {}}
    />
  );
};

describe('CustomPicker Component', () => {
  it('CustomPicker Atom rendered successful', () => {
    const { queryByTestId } = render(<WrapperPicker />);

    expect(queryByTestId('picker-atom')).toBeTruthy();
  });
});
