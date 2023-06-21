import {format} from 'date-fns';
import localeEs from 'date-fns/locale/es';
import localeEn from 'date-fns/locale/en-US';
import i18n from '../i18n';

export function formatDate(date: Date, dateFormat: string = 'P'): string {
  try {
    return format(date, dateFormat, {
      locale: i18n.t('language:tag') === 'es' ? localeEs : localeEn,
    });
  } catch (error) {
    console.warn(error);
    return '';
  }
}
