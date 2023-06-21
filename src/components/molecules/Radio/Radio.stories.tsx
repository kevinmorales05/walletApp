import {action} from '@storybook/addon-actions';
import {boolean} from '@storybook/addon-knobs';
import {BufferView} from './../../../utils/decorators';
import {storiesOf} from '@storybook/react-native';
import {Text} from 'react-native';
import Radio from './';
import React from 'react';

storiesOf('CITI-RN-Radio', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <Radio
      onPress={action('tapped-theme')}
      selected={boolean('selected', false)}
      disabled={boolean('disabled', false)}
    />
  ))
  .add('radio with children', () => (
    <Radio
      onPress={action('tapped-theme')}
      selected={boolean('selected', false)}
      disabled={boolean('disabled', false)}
      children={<Text>Hola, este es un ejemplo</Text>}
    />
  ));
