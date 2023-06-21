import React, {ReactNode} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ViewStyle,
  StatusBarStyle,
} from 'react-native';
import Theme from '../../../theme';

type BarStyle = 'light' | 'dark';

interface Props {
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  safeBGColor?: ViewStyle['backgroundColor'];
  bottomBGColor?: ViewStyle['backgroundColor'];
  topBGColor?: ViewStyle['backgroundColor'];
  children: ReactNode;
  barStyle?: BarStyle;
  backgroundColor?: ViewStyle['backgroundColor'];
  statusBarColor?: ViewStyle['backgroundColor'];
  hiddenStatusBar?: boolean;
  testID?: string;
}

const SafeArea: React.FC<Props> = ({
  topSafeArea = true,
  bottomSafeArea = true,
  safeBGColor,
  children,
  barStyle,
  backgroundColor = Theme.Colors.Bright,
  bottomBGColor,
  topBGColor,
  statusBarColor,
  hiddenStatusBar,
  testID,
}: Props) => {
  const renderChildren = () => (
    <View
      testID={`${testID}-children`}
      style={[styles.childrenContainerStyle, {backgroundColor}]}>
      {children}
    </View>
  );

  const renderStatusBar = () => {
    let barStyleValue: StatusBarStyle = 'default';

    switch (barStyle) {
      case 'light':
        barStyleValue = 'light-content';
        break;
      case 'dark':
        barStyleValue = 'dark-content';
        break;
      default:
        barStyleValue = 'default';
        break;
    }

    return (
      <StatusBar
        translucent={!topSafeArea}
        backgroundColor={
          !topSafeArea
            ? statusBarColor || 'transparent'
            : safeBGColor || Theme.Colors.Bright
        }
        barStyle={barStyleValue}
        hidden={hiddenStatusBar}
      />
    );
  };

  const renderComponent = () => (
    <View testID={`${testID}-component`} style={styles.flexStyle}>
      {renderStatusBar()}
      {renderChildren()}
    </View>
  );

  const renderContainer = () => (
    <View testID={`${testID}-container`} style={styles.flexStyle}>
      {topSafeArea && (
        <SafeAreaView
          testID={`${testID}-top`}
          style={{
            backgroundColor: topBGColor || safeBGColor || backgroundColor,
          }}
        />
      )}
      {renderComponent()}
      {bottomSafeArea && (
        <SafeAreaView
          testID={`${testID}-bottom`}
          style={{
            backgroundColor: bottomBGColor || safeBGColor || backgroundColor,
          }}
        />
      )}
    </View>
  );

  return (
    <View testID={testID} style={styles.flexStyle}>
      {renderContainer()}
    </View>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    flex: 1,
  },
  childrenContainerStyle: {
    flex: 1,
  },
});

export {SafeArea};
