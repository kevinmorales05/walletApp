import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Vibration} from 'react-native';
import {Container, Text, Touchable} from '../../../../components';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import Theme from '../../../../theme';
import {ARROW_LEFT_BLACK_ICON} from '../../../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../../../utils';
import BarcodeMask from 'react-native-barcode-mask';

interface Props {
  onPressQROk: (code: any) => void;
}

const QrReaderScreen: React.FC<Props> = ({onPressQROk}) => {
  const {goBack} = useNavigation<NativeStackNavigationProp<HomeStackParams>>();
  const {arrowContainer, arrowStyle} = styles;
  const devices = useCameraDevices();
  const device = devices.back;
  console.log("device", device);

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.ALL_FORMATS],
    {
      checkInverted: true,
    },
  );

  const [hasPermission, setHasPermission] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);

  const read = useRef<boolean>(false);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (barcodes.length > 0 && !read.current) {
      read.current = true;
      console.log(barcodes[0].displayValue);
      Vibration.vibrate(10);
      setCameraActive(false);
      Alert.alert(
        // eslint-disable-next-line no-nested-ternary
        `Código ${
          barcodes[0].format === 1
            ? 'de barras'
            : barcodes[0].format === 256
            ? 'QR'
            : 'no valido'
        }`,
        barcodes[0].displayValue,
        [
          {
            onPress: () => {
              onPressQROk(barcodes[0]);
            },
          },
        ],
      );
    }
  }, [barcodes, onPressQROk]);

  const onPressBack = () => {
    setCameraActive(false);
    goBack();
  };

  return (
    <Container flex>
      <Container
        style={{paddingHorizontal: 16, paddingVertical: 11}}
        backgroundColor={Theme.Colors.Bright}>
        <Text text="Escanea el código" typography="h3" textAlign="center" />
        <Container style={arrowContainer}>
          <Touchable
            onPress={() => {
              onPressBack();
            }}
            rounded>
            <Image
              source={ARROW_LEFT_BLACK_ICON}
              style={arrowStyle}
              resizeMode="contain"
            />
          </Touchable>
        </Container>
      </Container>
      <SafeAreaView style={styles.container}>
        {device != null && hasPermission && (
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={cameraActive}
            frameProcessor={frameProcessor}
            frameProcessorFps={5}>
            <BarcodeMask edgeColor="#62B1F6" showAnimatedLine={false} />
          </Camera>
        )}
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  arrowStyle: {
    width: 19,
    height: 22,
    marginHorizontal: 16,
    marginVertical: 12,
  },
});

export default QrReaderScreen;
