import React, { useState } from 'react';
import { Image, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  CROSS_ICON,
  SHARE_ICON,
  DOWNLOAD_ICON,
  QRCODE_ICON,
  BARCODE_ICON
} from 'assets/images';

import {
  Container, Text, Touchable, FadeInImage, TextSpan, Card
} from 'components';
import Theme from 'theme';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
// import Barcode from 'react-native-barcode-builder';
import { useSelector } from 'react-redux';
import { RootState } from 'reactRedux';
import Share from 'react-native-share';
import Barcode from 'react-native-barcode-svg';

interface Props {
  amount: number;
  onPressBack: () => void;
}

const QrCodeScreen: React.FC<Props> = ({
  amount,
  onPressBack
}) => {
  const {
    crossContainer,
    crossStyle,
    codeContainer,
    buttonsContainer,
    codesContainer,
    qrContainer
  } = styles;

  const userAccount = useSelector((state: RootState) => state.account);
  const paymentCode = `${amount}|${userAccount.account?.identification}`;
  const { t } = useTranslation();

  const [codeQR, setCodeQR] = useState<boolean>(true);
  let svg: any;

  const shareCode = () => {
    if (svg) svg.toDataURL(shareCallback);
  };

  const downloadCode = () => {
    if (svg) svg.toDataURL(downloadCallback);
  };

  const shareCallback = (dataURL: any) => {
    const shareImageBase64 = {
      url: `data:image/png;base64,${dataURL}`
    };
    Share.open(shareImageBase64).catch((e) => console.log('user cancel sharing'));
  };

  const downloadCallback = (dataURL: any) => {
    const shareImageBase64 = {
      url: `data:image/png;base64,${dataURL}`,
      saveToFiles: true
    };
    Share.open(shareImageBase64).catch((e) => console.log('user cancel download'));
  };

  return (
    <Container flex>
      <Container style={{ paddingHorizontal: 16, paddingVertical: 11 }}>
        <Text text={t('qrCode:qrCollectCode')} typography="h3" textAlign="center" />
        <Text text="" />
        <Container style={crossContainer}>
          <Touchable onPress={onPressBack} rounded>
            <Image source={CROSS_ICON} style={crossStyle} />
          </Touchable>
        </Container>
      </Container>

      <Container middle style={codeContainer}>
        { codeQR
          ? (
            <QRCode
              value={paymentCode}
              size={150}
              // eslint-disable-next-line no-return-assign
              getRef={(c) => (svg = c)}
            />
          )
          : (
            <Barcode
              value={paymentCode}
              format="CODE128"
              singleBarWidth={1}
            />
          )}
        <TextSpan
          text={paymentCode}
          typography="description"
          marginTop={16}
          textAlign="center"
          textColor={Theme.Colors.BluishGrey}
          onPress={() => {}}
        />
      </Container>

      <TextSpan
        text={t('qrCode:codeValue')}
        typography="paragraph"
        textAlign="center"
        marginBottom={4}
        onPress={() => {}}
      />

      <TextSpan
        text={`$${amount.toString()}.00`}
        textColor={Theme.Colors.BrassBalls}
        typography="h1"
        textAlign="center"
        onPress={() => {}}
      />

      <Container row middle space="around" style={buttonsContainer}>

        <Container width={45} height={45} middle circle>
          <Card onPress={downloadCode}>
            <LinearGradient style={StyleSheet.absoluteFill} colors={Theme.Colors.ButtonPrimaryGradient} />
            <FadeInImage source={DOWNLOAD_ICON} width={27} height={24} />
          </Card>
        </Container>

        <Container width={45} height={45} middle circle>
          <Card onPress={shareCode}>
            <LinearGradient style={StyleSheet.absoluteFill} colors={Theme.Colors.ButtonPrimaryGradient} />
            <FadeInImage source={SHARE_ICON} width={27} height={24} />
          </Card>
        </Container>

      </Container>

      <Container row middle space="evenly" style={codesContainer}>
        <Card shadow={false} column style={qrContainer} crossCenter onPress={() => { setCodeQR(true); }}>
          <FadeInImage source={QRCODE_ICON} width={21} height={24} style={{ alignSelf: 'center' }} />
          <TextSpan
            text={t('qrCode:qrCode')}
            typography="description"
            textAlign="center"
          />
        </Card>
        <Card shadow={false} column style={qrContainer} crossCenter onPress={() => { setCodeQR(false); }}>
          <FadeInImage source={BARCODE_ICON} width={21} height={24} style={{ alignSelf: 'center' }} />
          <TextSpan
            text={t('qrCode:barCode')}
            typography="description"
            textAlign="center"
          />
        </Card>
      </Container>
    </Container>
  );
};

const styles = StyleSheet.create({
  crossContainer: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  crossStyle: {
    width: 15,
    height: 22,
    marginVertical: 13,
    marginHorizontal: 16
  },
  codeContainer: {
    height: 219,
    marginTop: 16,
    paddingTop: 60,
    paddingBottom: 57,
    marginBottom: 20,
    borderRadius: 8,
    marginHorizontal: 69,
    backgroundColor: Theme.Colors.Bright
  },
  buttonsContainer: {
    marginHorizontal: 126,
    marginTop: 32
  },
  codesContainer: {
    height: 60,
    marginHorizontal: 36,
    marginTop: 24
  },
  qrContainer: {
    width: 140,
    height: 60,
    borderRadius: 8,
    backgroundColor: Theme.Colors.Bright
  }

});

export default QrCodeScreen;
