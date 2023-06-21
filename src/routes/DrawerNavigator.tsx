import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerParams} from '../utils';
import HomeStack from './HomeStack';
import DrawerComponent from './DrawerComponent';

const Drawer = createDrawerNavigator<DrawerParams>();

const DrawerNavigator = () => (
  <Drawer.Navigator
    screenOptions={{headerShown: false}}
    drawerContent={props => <DrawerComponent {...props} />}>
    <Drawer.Screen name="HomeStack" component={HomeStack} />
  </Drawer.Navigator>
);

export default DrawerNavigator;
