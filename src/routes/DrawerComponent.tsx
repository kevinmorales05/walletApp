/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Image} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Container, TextContainer, Touchable} from '../components';
import Theme from '../theme';
import {
  BELL_ICON,
  CIRCLE_ICON,
  INFO_YELLOW_ICON,
  LOGOUT_ICON,
  PROFILE,
  PROFILE_ICON,
} from '../assets/images';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAlert} from '../context';
import {useSelector, useDispatch} from 'react-redux';
import {
  RootState,
  setInitialState,
  setInitialStateAppAction,
} from '../reactRedux';

const DrawerComponent: React.FC<DrawerContentComponentProps> = (
  props,
  navigation,
) => {
  const userAuth = useSelector((state: RootState) => state.auth);
  const alert = useAlert();
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onPressUnavailableItem = () => {
    alert.show({
      title: t('global:sorry'),
      message: t('global:functionalityNotAvailable'),
    });
  };

  /**
   * Main Logout
   * When user logout the redux store sets isLogged property as false, then AppNavigator hides DrawerNavigator.
   */
  const logout = () => {
    dispatch(setInitialState());
    dispatch(setInitialStateAppAction());
  };

  return (
    <Container flex>
      <DrawerContentScrollView {...props}>
        <Container
          style={{padding: 20}}
          backgroundColor={Theme.Colors.WhiteVariant}>
          <Image
            source={PROFILE}
            style={{width: 90, height: 60}}
            resizeMode="contain"
          />
          <TextContainer
            text={userAuth.name}
            fontSize={18}
            fontWeight="bold"
            marginTop={16}
          />
          <TextContainer text={userAuth.email} fontSize={16} marginTop={8} />
        </Container>
        <Container style={{padding: 20}}>
          <Touchable onPress={onPressUnavailableItem}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={PROFILE_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:profile')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>

          <Touchable onPress={onPressUnavailableItem}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={INFO_YELLOW_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:clarifications')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>

          <Touchable onPress={onPressUnavailableItem}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={BELL_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:notifications')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>

          <Container
            width="100%"
            height={2}
            backgroundColor={Theme.Colors.LightBorder}
            style={{marginVertical: 24}}
          />

          <Touchable onPress={onPressUnavailableItem}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={CIRCLE_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:promotions')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>

          <Touchable onPress={onPressUnavailableItem}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={CIRCLE_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:about')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>

          <Touchable onPress={onPressUnavailableItem}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={CIRCLE_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:help')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>

          <Container height={60} />

          <Touchable onPress={logout}>
            <Container center row style={{paddingVertical: 12}}>
              <Image
                source={LOGOUT_ICON}
                style={{width: 30, height: 30}}
                resizeMode="contain"
              />
              <TextContainer
                text={t('drawer:logout')}
                marginLeft={16}
                fontSize={18}
              />
            </Container>
          </Touchable>
        </Container>
      </DrawerContentScrollView>
      <TextContainer
        text={t('drawer:version')}
        fontSize={18}
        marginLeft={20}
        textColor={Theme.Colors.TextGray}
      />
      <SafeAreaView />
    </Container>
  );
};

export default DrawerComponent;
