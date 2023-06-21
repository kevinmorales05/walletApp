import {action} from '@storybook/addon-actions';
import {boolean} from '@storybook/addon-knobs';
import {BufferView} from './../../../utils/decorators';
import {storiesOf} from '@storybook/react-native';
import {Text} from 'react-native';
import CheckBox from './';
import React from 'react';

storiesOf('CITI-RN-CheckBox', module)
  .addDecorator(BufferView)
  .add('default', () => (
    <CheckBox
      onPress={action('tapped-theme')}
      selected={boolean('selected', false)}
      disabled={boolean('disabled', false)}
    />
  ))
  .add('CheckBox with label', () => (
    <CheckBox
      onPress={action('tapped-theme')}
      selected={boolean('selected', false)}
      disabled={boolean('disabled', false)}
      children={<Text>Label</Text>}
    />
  ));
