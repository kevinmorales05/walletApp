import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  RootState,
  setErrorAction,
  setInitialStateAppAction,
} from '../reactRedux';
import {useSelector, useDispatch} from 'react-redux';
import {useAlert, useLoading} from '../context';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator<any>();

const AppNavigator: React.FC = () => {
  const {isLogged} = useSelector((state: RootState) => state.auth);
  const {error} = useSelector((state: RootState) => state.app);
  const alert = useAlert();
  const dispatch = useDispatch();
  const loader = useLoading();

  /**
   * Show global http errors.
   */
  useEffect(() => {
    if (error !== undefined) {
      alert.show({
        title: error,
      });
      loader.hide();
      dispatch(setErrorAction(undefined));
    }
  }, [error]);

  /**
   * Reset the app state
   */
  useEffect(() => {
    dispatch(setInitialStateAppAction());
  }, []);

  if (false) {
    return (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="AuthStack">
        <Stack.Screen name="AuthStack" component={AuthStack} />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DrawerNavigator">
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
