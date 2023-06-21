import { ZipCodeInfoResponse, zipCodeServices } from 'services';
import { CallbackType } from 'utils';

export function getZipCodeInfo(zipCode: string, callback: CallbackType<ZipCodeInfoResponse>) {
  return async () => {
    try {
      const state = await zipCodeServices.getInfo(zipCode);

      callback(true, state);
    } catch (error: any) {
      console.warn(error);
      callback(false);
    }
  };
}
