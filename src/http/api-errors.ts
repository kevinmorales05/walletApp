import i18n from '../i18n';

export type GeneralApiProblem = {kind: string};

/**
 * Attempts to get a common cause of general problems from an api response.
 *
 * @param response The api response code.
 */
export function getGeneralApiProblem(response: number): GeneralApiProblem {
  switch (response) {
    case 400:
      return {kind: i18n.t('httpClientErrors:400')};
    case 401:
      return {kind: i18n.t('httpClientErrors:401')};
    case 403:
      return {kind: i18n.t('httpClientErrors:403')};
    case 404:
      return {kind: i18n.t('httpClientErrors:404')};
    case 500:
      return {kind: i18n.t('httpServerErrors:500')};
    case 502:
      return {kind: i18n.t('httpServerErrors:502')};
    case 503:
      return {kind: i18n.t('httpServerErrors:503')};
    case 504:
      return {kind: i18n.t('httpServerErrors:504')};
    default:
      return {kind: i18n.t('httpClientErrors:UE')};
  }
}
