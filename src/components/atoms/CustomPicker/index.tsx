import React, {useEffect, useRef, useState} from 'react';
import {
  ActionSheetIOS,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Picker, PickerProps} from '@react-native-picker/picker';
import {Control, FieldValues, RegisterOptions} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import RBSheet from 'react-native-raw-bottom-sheet';
import {CHEVRON_DOWN_ICON} from '../../../assets/images';
import {Input} from '../Input';
import {Touchable} from '../Touchable';
import Theme from '../../../theme';
import {Container} from '../Container';
import {TouchableText} from '../../molecules/TouchableText';

interface Props {
  label?: string;
  placeholder?: string;
  error?: string;
  options: Array<string>;
  useActionSheet?: boolean;
  actionSheetTitle?: string;
  marginTop?: number;
  androidMode?: PickerProps['mode'];
  name: string;
  control: Control<FieldValues, string>;
  rules?: RegisterOptions;
  onSelect: (value: string) => void;
  testID?: string;
}

const CustomPicker: React.FC<Props> = ({
  label,
  placeholder = '',
  error = '',
  options,
  useActionSheet,
  actionSheetTitle = placeholder,
  marginTop = 8,
  androidMode,
  name,
  control,
  rules,
  onSelect,
  testID,
}) => {
  const {t} = useTranslation();

  const pickerRef = useRef<any>(null);
  const sheetRef = useRef<RBSheet>(null);

  const [value, setValue] = useState<string>('');

  useEffect(() => {
    onSelect(value);
  }, [value]);

  const onPressPicker = () => {
    if (Platform.OS === 'android') {
      pickerRef.current?.focus();
    } else if (useActionSheet) {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          title: actionSheetTitle,
          tintColor: Theme.Colors.Accent,
          options: [...options.map(item => `${item}`), t('global:cancel')],
          cancelButtonIndex: options.length,
          userInterfaceStyle: 'light',
        },
        buttonIndex => {
          if (buttonIndex !== options.length) setValue(options[buttonIndex]);
        },
      );
    } else {
      sheetRef.current?.open();
    }
  };

  return (
    <>
      <Touchable testID={testID} onPress={onPressPicker}>
        {Platform.OS === 'android' && (
          <Picker
            ref={pickerRef}
            selectedValue={value}
            onValueChange={setValue}
            style={[StyleSheet.absoluteFill, {opacity: 0}]}
            mode={androidMode}>
            <Picker.Item label={t('global:select')} value="" />
            {options.map(element => (
              <Picker.Item key={element} label={element} value={element} />
            ))}
          </Picker>
        )}
        <Input
          label={label}
          placeholder={placeholder}
          error={error}
          autoCapitalize="sentences"
          marginTop={marginTop}
          name={name}
          control={control}
          rules={rules}
          renderErrorIcon={false}
        />
        <Container
          middle
          style={{
            position: 'absolute',
            right: 0,
            top: marginTop + (label ? 25 : 0),
            bottom: error ? 20 : 0,
            paddingHorizontal: 16,
          }}>
          <Image
            source={CHEVRON_DOWN_ICON}
            style={{width: 14, height: 16}}
            resizeMode="contain"
          />
        </Container>
      </Touchable>

      <RBSheet ref={sheetRef}>
        <Container style={{backgroundColor: Theme.Colors.Bright}}>
          <Container row space="between" style={{paddingTop: 8}}>
            <TouchableText
              text={t('global:cancel')}
              textColor={Theme.Colors.Accent}
              marginLeft={16}
              onPress={() => sheetRef.current?.close()}
            />
            <TouchableText
              text={t('global:accept')}
              textColor={Theme.Colors.Accent}
              marginRight={16}
              onPress={() => {
                if (!value) setValue(options[0]);

                sheetRef.current?.close();
              }}
            />
          </Container>
          <Picker
            ref={pickerRef}
            selectedValue={value}
            onValueChange={setValue}
            dropdownIconRippleColor={Theme.Colors.Accent}>
            {options.map(element => (
              <Picker.Item
                key={element}
                label={element}
                value={element}
                color={Theme.Colors.Black}
                fontFamily={Theme.Fonts.Regular}
              />
            ))}
          </Picker>
          <SafeAreaView />
        </Container>
      </RBSheet>
    </>
  );
};

export {CustomPicker};
