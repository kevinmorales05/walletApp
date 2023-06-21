import {View} from 'react-native';
import React from 'react';

export const BufferView = (storyFn: Function) => (
  // eslint-disable-next-line react-native/no-inline-styles
  <View style={{flex: 1, marginVertical: 40, marginHorizontal: 20}}>
    {storyFn()}
  </View>
);
