import React, {ForwardedRef, forwardRef, useMemo, useState} from 'react';
import {Dimensions, Image, StyleSheet} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Container, Text, Touchable} from '../atoms';
import Theme from '../../theme';
import {
  CHECK_GREEN_ICON,
  CHEVRON_RIGHT_GRAY_ICON,
  DOLLAR_SIGN_ICON,
  TRIANGLE_DOWN_ICON,
} from '../../assets/images';
import {ModalCard, TextContainer} from '../molecules';
import {TransactionType} from '../../reactRedux';
import {formatDate} from '../../utils';

const SCREEN_HEIGHT = Dimensions.get('window').height;

interface Props {
  transactions: Array<TransactionType>;
  onPressMovement: (movement: TransactionType) => void;
}

interface MonthItemProps {
  onPress: () => void;
  label: string;
  selected: boolean;
}

const MovementsSheet = forwardRef(
  ({transactions, onPressMovement}: Props, ref: ForwardedRef<BottomSheet>) => {
    const {containerStyle} = styles;

    const {t} = useTranslation();
    const insets = useSafeAreaInsets();

    const bottomSheetHeight = SCREEN_HEIGHT - insets.top - 100;

    const snapPoints = useMemo(
      () => [bottomSheetHeight - 450, bottomSheetHeight],
      [],
    );

    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<string>('');

    const monthsData = useMemo(() => {
      const aux: {[U: string]: {label: string; data: TransactionType[]}} = {};

      transactions.forEach((item, index) => {
        const date = new Date(item.date);

        const month = date.getMonth();
        const year = date.getFullYear();

        const key = `${month}-${year}`;
        if (index === 0) setSelectedMonth(key);
        if (!aux[key]) {
          aux[key] = {
            label: formatDate(date, 'MMMM yyyy'),
            data: [item],
          };
        } else {
          aux[key]?.data?.push(item);
        }
      });

      return aux;
    }, [transactions]);

    const months = useMemo(() => {
      const aux: {key: string; label: string}[] = Object.keys(monthsData).map(
        key => ({
          key,
          label: monthsData[key]?.label || '',
        }),
      );

      return aux;
    }, [monthsData]);

    return (
      <>
        <BottomSheet
          ref={ref}
          index={-1}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: Theme.Colors.Bright,
            borderRadius: 40,
          }}
          handleIndicatorStyle={{
            backgroundColor: Theme.Colors.LightGrey,
            width: 60,
            height: 6,
            borderRadius: 4,
          }}>
          <Container
            row
            space="between"
            style={{paddingHorizontal: 16, marginVertical: 16}}>
            <Text text={t('myAccount:movements')} typography="h4" />
            <Touchable onPress={() => setFilterVisible(true)}>
              <Container row center>
                <TextContainer
                  text={monthsData[selectedMonth]?.label || ''}
                  fontSize={14}
                  textColor={Theme.Colors.BluishGrey}
                  marginRight={8}
                  transform="capitalize"
                />
                <Image
                  source={TRIANGLE_DOWN_ICON}
                  style={{width: 10, height: 16}}
                  resizeMode="contain"
                />
              </Container>
            </Touchable>
          </Container>
          <BottomSheetFlatList
            style={{
              flex: 1,
              paddingBottom: insets.bottom,
              paddingHorizontal: 16,
            }}
            data={monthsData[selectedMonth]?.data}
            renderItem={({item}) => (
              <Touchable onPress={() => onPressMovement(item)}>
                <Container style={containerStyle}>
                  <Container row center>
                    <Container
                      width={32}
                      height={32}
                      circle
                      middle
                      backgroundColor={
                        item.amount <= 0
                          ? Theme.Colors.LightGrey
                          : Theme.Colors.Success16
                      }>
                      <Image
                        source={DOLLAR_SIGN_ICON}
                        style={{width: 16, height: 16}}
                        resizeMode="contain"
                      />
                    </Container>
                    <Container flex style={{marginLeft: 16}}>
                      <Text text={item.type} fontSize={14} />
                      <TextContainer
                        text={formatDate(new Date(item.date), 'P - hh:mm aaa')}
                        typography="label"
                        marginTop={2}
                      />
                    </Container>
                    <TextContainer
                      text={`${item.amount < 0 ? '-$' : '$'}${Math.abs(
                        item.amount,
                      ).toFixed(2)}`}
                      typography="h4"
                      marginRight={21}
                      textColor={
                        item.amount <= 0
                          ? Theme.Colors.Black
                          : Theme.Colors.Success
                      }
                    />
                    <Image
                      source={CHEVRON_RIGHT_GRAY_ICON}
                      style={{width: 16, height: 16}}
                      resizeMode="contain"
                    />
                  </Container>
                </Container>
              </Touchable>
            )}
          />
        </BottomSheet>
        <ModalCard
          visible={filterVisible}
          onDismiss={() => setFilterVisible(false)}
          renderCloseComponent={false}
          padding={0}>
          <TextContainer
            text={t('myAccount:month')}
            typography="label"
            marginLeft={9}
            marginTop={15}
            marginBottom={12}
          />
          {months.map(item => (
            <MonthItem
              key={item.key}
              onPress={() => {
                setFilterVisible(false);
                setSelectedMonth(item.key);
              }}
              label={item.label}
              selected={selectedMonth === item.key}
            />
          ))}
          <Container />
        </ModalCard>
      </>
    );
  },
);

const MonthItem: React.FC<MonthItemProps> = ({onPress, label, selected}) => {
  const {monthItemStyle} = styles;

  return (
    <Touchable onPress={onPress}>
      <Container row style={monthItemStyle}>
        <Container flex>
          <Text text={label} typography="paragraph" transform="capitalize" />
        </Container>
        {selected && (
          <Image
            source={CHECK_GREEN_ICON}
            style={{width: 18, height: 18}}
            resizeMode="contain"
          />
        )}
      </Container>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderColor: Theme.Colors.LightGrey,
  },
  monthItemStyle: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: Theme.Colors.LightGrey,
  },
});

export {MovementsSheet};
