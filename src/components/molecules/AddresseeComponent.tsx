import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {USER_GRAY_ICON} from '../../assets/images';
import {Card, Container, Text} from '../../components/atoms';
import Theme from '../../theme';
import {TextContainer} from './TextContainer';

interface Props {
  shortName: string;
  fullName: string;
  account: string;
  onPress?: () => void;
  renderBorder: boolean;
  shadow?: boolean;
  padding?: number;
}

const AddresseeComponent: React.FC<Props> = ({
  account,
  fullName,
  shortName,
  onPress,
  renderBorder,
  shadow = false,
  padding = 0,
}) => {
  const {addresseeStyle} = styles;

  return (
    <Card
      padding={padding}
      shadow={shadow}
      style={{...addresseeStyle, borderBottomWidth: renderBorder ? 1 : 0}}
      onPress={onPress}>
      <Container
        middle
        width={32}
        height={32}
        circle
        backgroundColor={Theme.Colors.MedGray}>
        <Image
          source={USER_GRAY_ICON}
          style={{width: 16, height: 16}}
          resizeMode="contain"
        />
      </Container>

      <Container flex style={{marginLeft: 16}}>
        <TextContainer text={shortName} typography="h4" marginBottom={2} />
        <TextContainer
          text={fullName}
          typography="description"
          marginBottom={2}
        />
        <Text text={account} typography="paragraph" />
      </Container>
    </Card>
  );
};

const styles = StyleSheet.create({
  addresseeStyle: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: Theme.Colors.LightGrey,
  },
});

export {AddresseeComponent};
