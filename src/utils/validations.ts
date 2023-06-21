import {ErrorType} from './types';

interface ValidationInterface {
  ok: boolean;
  error: ErrorType;
}

export const email = (value: string): ValidationInterface => {
  let error: ErrorType;

  if (!value) error = 'required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value))
    error = 'invalid-format';

  return {ok: !error, error};
};

export const password = (
  value: string,
  length: number = 8,
): ValidationInterface => {
  let error: ErrorType;

  if (!value) error = 'required';
  else if (value.length < length) error = 'invalid-format';

  return {ok: !error, error};
};

export const confirmPassword = (
  value: string,
  compareValue: string,
): ValidationInterface => {
  let error: ErrorType;

  if (!value) error = 'required';
  else if (value !== compareValue) error = 'not-match';

  return {ok: !error, error};
};

export const phone = (value: string): ValidationInterface => {
  let error: ErrorType;
  const auxValue = value.replace('(', '').replace(') ', '').replace(' ', '');

  if (!auxValue) error = 'required';
  else if (!/^[0-9]+$/.test(auxValue) || auxValue.length !== 10)
    error = 'invalid-format';

  return {ok: !error, error};
};

export const alphabet = (value: string): ValidationInterface => {
  let error: ErrorType;

  if (!value) error = 'required';
  else if (!/^[A-Za-zñÑáÁéÉíÍóÓúÚöÖüÜ ]+$/.test(value))
    error = 'invalid-format';

  return {ok: !error, error};
};

export const float = (value: string): ValidationInterface => {
  let error: ErrorType;

  if (!value) error = 'required';
  else if (!/^[+-]?((\.\d+)|(\d+(\.\d+)?))$/.test(value))
    error = 'invalid-format';

  return {ok: !error, error};
};

export const integer = (value: string): ValidationInterface => {
  let error: ErrorType;

  if (!value) error = 'required';
  else if (!/^[0-9]+$/.test(value)) error = 'invalid-format';

  return {ok: !error, error};
};

export const cardNumber = (value: string): ValidationInterface => {
  let error: ErrorType;

  const aux = value.split(' ').join('');
  if (!value) error = 'required';
  else if (!/^[0-9]+$/.test(aux) || !(aux.length === 16 || aux.length === 15))
    error = 'invalid-format';

  return {ok: !error, error};
};

export const cardExpirationDate = (value: string): ValidationInterface => {
  let error: ErrorType;

  const aux = value.replace('/', '');
  if (!value) error = 'required';
  else if (!/^[0-9]+$/.test(aux) || aux.length !== 4) error = 'invalid-format';

  return {ok: !error, error};
};

export const required = (value: string): ValidationInterface => {
  let error: ErrorType;

  if (!value || value === '') error = 'required';

  return {ok: !error, error};
};
