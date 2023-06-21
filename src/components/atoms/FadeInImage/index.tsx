import React, {useState} from 'react';
import {
  Animated,
  Image,
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  RegisteredStyle,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

interface Props {
  width?: ImageStyle['width'];
  height?: ImageStyle['height'];
  borderRadius?: ImageStyle['borderRadius'];
  source: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
  style?: ViewStyle | RegisteredStyle<StyleSheet.AbsoluteFillStyle>;
  fadeIn?: boolean;
  testID?: string;
}

const FadeInImage: React.FC<Props> = ({
  source,
  width,
  height,
  borderRadius,
  resizeMode,
  style,
  fadeIn = true,
  testID,
}: Props) => {
  const [opacity] = useState<Animated.Value>(new Animated.Value(0));

  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View
      testID={testID}
      style={[{width, height, borderRadius}, style, {overflow: 'hidden'}]}>
      {fadeIn ? (
        <Animated.Image
          testID={`${testID}-animated`}
          onLoadEnd={onLoad}
          source={source}
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
            opacity,
          }}
          resizeMode={resizeMode}
        />
      ) : (
        <Image
          testID={`${testID}-static`}
          source={source}
          style={{
            width: '100%',
            height: '100%',
            borderRadius,
          }}
          resizeMode={resizeMode}
        />
      )}
    </View>
  );
};

export {FadeInImage};
