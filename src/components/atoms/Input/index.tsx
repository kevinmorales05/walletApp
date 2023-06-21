/* eslint-disable react/jsx-props-no-spreading */
import React, {ForwardedRef, forwardRef, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TextInputProps,
} from 'react-native';
import Theme from '../../../theme';
import {ERROR_CROSS_ICON, EYE_OFF_ICON} from '../../../assets/images';
import Collapsible from 'react-native-collapsible';
import {
  Control,
  Controller,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {Touchable} from '../Touchable';
import {Container} from '../Container';
import {TextContainer} from '../../molecules/TextContainer';

export interface Props {
  label?: string;
  placeholder?: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoComplete?: TextInputProps['autoComplete'];
  autoCorrect?: TextInputProps['autoCorrect'];
  autoFocus?: TextInputProps['autoFocus'];
  blurOnSubmit?: TextInputProps['blurOnSubmit'];
  editable?: TextInputProps['editable'];
  keyboardType?: TextInputProps['keyboardType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  defaultValue?: TextInputProps['value'];
  passwordField?: boolean;
  showPasswordEnable?: boolean;
  error?: string;
  onFocus?: TextInputProps['onFocus'];
  onBlur?: TextInputProps['onBlur'];
  marginTop?: number;
  maxLength?: number;
  prefixImage?: ImageSourcePropType;
  centerElements?: boolean;
  hideLabel?: boolean;
  name: string;
  control: Control<FieldValues, string>;
  rules?: RegisterOptions;
  renderErrorIcon?: boolean;
  testID?: string;
}

const Input = forwardRef(
  (
    {
      label = '',
      placeholder = '',
      autoCapitalize = 'none',
      autoComplete = 'off',
      autoCorrect,
      autoFocus,
      blurOnSubmit = true,
      editable = true,
      keyboardType = 'default',
      onSubmitEditing,
      defaultValue,
      passwordField,
      showPasswordEnable = true,
      error = '',
      onFocus,
      onBlur,
      marginTop = 8,
      maxLength,
      prefixImage,
      centerElements,
      hideLabel,
      name,
      control,
      rules,
      renderErrorIcon = true,
      testID,
    }: Props,
    ref: ForwardedRef<any>,
  ) => {
    const {
      inputStyle,
      inputContainerStyle,
      passwordImageStyle,
      errorImageStyle,
      prefixImageStyle,
    } = styles;
    const [secureTextEntry, setSecureTextEntry] = useState<boolean>(
      passwordField || false,
    );
    const [focused, setFocused] = useState<boolean>(false);

    const textInputProps: TextInputProps = {
      placeholder,
      placeholderTextColor: Theme.Colors.BluishGrey,
      autoCapitalize,
      autoComplete,
      autoCorrect,
      autoFocus,
      blurOnSubmit,
      editable,
      keyboardType,
      maxLength: maxLength || 100,
      onSubmitEditing,
      returnKeyType: 'done',
      underlineColorAndroid: 'transparent',
      selectionColor: Theme.Colors.Accent,
      onFocus: e => {
        if (onFocus) onFocus(e);
        setFocused(true);
      },
      onBlur: e => {
        if (onBlur) onBlur(e);
        setFocused(false);
      },
      secureTextEntry,
      style: [
        inputStyle,
        {
          textAlign: centerElements ? 'center' : 'left',
          textAlignVertical: 'center',
          paddingBottom: 14,
          paddingTop: hideLabel ? 2 : 14,
        },
      ],
      selection: !editable ? {start: 0, end: 0} : undefined,
    };

    const borderColor = error
      ? Theme.Colors.Error
      : (focused && Theme.Colors.Accent) || Theme.Colors.MedGray;

    return (
      <Container testID={testID} style={{marginTop}}>
        {!!label && !hideLabel && (
          <TextContainer
            testID={`${testID}-label`}
            text={label}
            typography="label"
            marginBottom={8}
          />
        )}
        <Container
          row
          center
          height={hideLabel ? 68 : undefined}
          style={{
            ...inputContainerStyle,
            borderColor,
            backgroundColor: !editable ? Theme.Colors.LightGrey : undefined,
          }}>
          {prefixImage && (
            <Image
              testID={`${testID}-prefix-image`}
              source={prefixImage}
              style={prefixImageStyle}
              resizeMode="contain"
            />
          )}
          <Container flex>
            {!!label && hideLabel && (
              <Container style={{marginHorizontal: 12, marginTop: 12}}>
                <Collapsible collapsed={!focused}>
                  <TextContainer
                    testID={`${testID}-hidden-label`}
                    text={label}
                    typography="label"
                  />
                </Collapsible>
              </Container>
            )}
            <Controller
              name={name}
              defaultValue={defaultValue}
              control={control}
              rules={rules}
              render={({field}) => (
                <TextInput
                  testID={`${testID}-input`}
                  ref={ref}
                  {...textInputProps}
                  value={field.value}
                  onChangeText={field.onChange}
                />
              )}
            />
          </Container>
          {passwordField && showPasswordEnable && (
            <Touchable
              testID={`${testID}-hide-password`}
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              opacityEffect>
              <Image source={EYE_OFF_ICON} style={passwordImageStyle} />
            </Touchable>
          )}
          {!(passwordField && showPasswordEnable) &&
            !!error &&
            renderErrorIcon && (
              <Image
                testID={`${testID}-error-image`}
                source={ERROR_CROSS_ICON}
                style={errorImageStyle}
              />
            )}
        </Container>
        {!!error && (
          <TextContainer
            testID={`${testID}-error-label`}
            text={error}
            typography="description"
            textColor={Theme.Colors.Error}
            marginTop={2}
            textAlign={centerElements ? 'center' : 'left'}
          />
        )}
      </Container>
    );
  },
);

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: Theme.Sizes.Paragraph,
    fontFamily: Theme.Fonts.Regular,
    paddingHorizontal: 12,
    color: Theme.Colors.Black,
  },
  inputContainerStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.Colors.MedGray,
  },
  passwordImageStyle: {
    width: 20,
    height: 16,
    marginRight: 15,
    marginVertical: 15,
  },
  errorImageStyle: {
    width: 10,
    height: 14,
    marginRight: 15,
    marginVertical: 15,
  },
  prefixImageStyle: {
    width: 16,
    height: 16,
    marginLeft: 15,
    marginVertical: 15,
  },
});

export {Input};
