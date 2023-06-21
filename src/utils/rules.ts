import i18n from '../i18n';
import {RegisterOptions} from 'react-hook-form';

export const emailRules: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      return `${i18n.t('signUp:enterValidEmail')}`;
    }

    return true;
  },
};

export const passwordRule: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z.\d]{6,}$/.test(value)) {
      return `${i18n.t('signUp:enterValidPassword')}`;
    }

    return true;
  },
};

export const confirmPasswordRule = (compare: string): RegisterOptions => ({
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    if (!/^(?=.*[A-Z])(?=.*\d)[a-zA-Z.\d]{6,}$/.test(value)) {
      return `${i18n.t('signUp:enterValidPassword')}`;
    }

    if (value !== compare) {
      return `${i18n.t('signUp:passwordNotMatch')}`;
    }

    return true;
  },
});

export const confirmOtpRule = (compare: string): RegisterOptions => ({
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    if (value !== compare) {
      return 'Los códigos no coinciden';
    }

    return true;
  },
});

export const otpRule: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  maxLength: 6,
};

export const searchAccountRule: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  maxLength: 18,
  validate: (value: string) => {
    if (!/^[0-9]+$/.test(value)) {
      return `${i18n.t('searchAddressee:enterValidNumber')}`;
    }

    return true;
  },
};

export const alphabetRule = (required: boolean): RegisterOptions => ({
  required: {
    value: required,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    if (!/^[A-Za-zñÑáÁéÉíÍóÓúÚöÖüÜ ]+$/.test(value)) {
      return `${i18n.t('global:enterValidFormat')}`;
    }

    return true;
  },
});

export const amountRule = (max?: number): RegisterOptions => ({
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  max:
    max !== undefined
      ? {
          value: max,
          message: `${i18n.t('amount:incorrectAmount')}`,
        }
      : undefined,
  min: 1,
  validate: (value: string) => {
    if (!/^[+-]?((\.\d+)|(\d+(\.\d+)?))$/.test(value)) {
      return `${i18n.t('global:enterValidFormat')}`;
    }
    const nval = `$ ${parseInt(value, 10)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
    console.log(nval);

    return true;
  },
});

export const mobilePhoneRule: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    if (!/^[0-9]{10}$/.test(value)) {
      return 'Formato incorrecto';
    }

    return true;
  },
  minLength: 1,
};

export const curpRule: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    // eslint-disable-next-line max-len
    if (
      !/[A-Z]{1}[AEIOUX]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$/.test(
        value,
      )
    ) {
      return 'Formato incorrecto';
    }

    return true;
  },
  minLength: 1,
};

export const rfcRule: RegisterOptions = {
  required: {
    value: true,
    message: `${i18n.t('global:requiredField')}`,
  },
  validate: (value: string) => {
    // eslint-disable-next-line max-len
    if (
      !/^([A-Za-z\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9\d]{3})?$/.test(
        value,
      )
    ) {
      return 'Formato incorrecto';
    }

    return true;
  },
  minLength: 1,
};
