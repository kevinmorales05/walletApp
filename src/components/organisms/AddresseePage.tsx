import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Container, Text} from '../../components/atoms';
import {
  AddresseeComponent,
  Button,
  TouchableText,
} from '../../components/molecules';
import Theme from '../../theme';

interface Props {
  onSelect: () => void;
  onPressNewAddressee: () => void;
}

const AddresseePage: React.FC<Props> = ({onSelect, onPressNewAddressee}) => {
  const {containerStyle} = styles;

  const {t} = useTranslation();

  return (
    <Container
      flex
      backgroundColor={Theme.Colors.Bright}
      style={containerStyle}>
      <Text text={t('addressee:addressee')} typography="h4" />
      <Button
        label={`+ ${t('addressee:addNew')}`}
        onPress={onPressNewAddressee}
        variant="custom"
        backgroundColor={Theme.Colors.Bright}
        textColor={Theme.Colors.Text}
        borderWidth={2}
        borderColor={Theme.Colors.MedGray}
        marginVertical={24}
      />

      <Container row space="between" style={{marginVertical: 8}}>
        <Text
          text={t('addressee:recent')}
          fontSize={Theme.Sizes.H4}
          fontWeight="Bold"
          textColor={Theme.Colors.BluishGrey}
        />
        <TouchableText
          text={t('addressee:seeAll')}
          typography="link2"
          underline
          onPress={() => {}}
        />
      </Container>

      <AddresseeComponent
        shortName="Betica"
        fullName="Beatriz Aurora Pinzón Solano"
        account="Cuenta **** 3123"
        onPress={onSelect}
        renderBorder
      />
      <AddresseeComponent
        shortName="Don Armando"
        fullName="Armando Mendoza"
        account="CLABE **** 4892"
        onPress={onSelect}
        renderBorder
      />
      <AddresseeComponent
        shortName="Don Armando"
        fullName="Armando Mendoza"
        account="CLABE **** 4892"
        onPress={onSelect}
        renderBorder={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
    marginTop: 8,
  },
});

export {AddresseePage};
