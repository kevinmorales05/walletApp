import {ApiZipCodes} from '../http/api-zipcodes';

export type ZipCodeInfoResponse = {
  zipCode: string;
  colonies: Array<string>;
  state: string;
  municipality: string;
};

async function getInfo(zipCode: string): Promise<ZipCodeInfoResponse> {
  const response = await ApiZipCodes.getInstance().getRequest(
    `/codigo_postal/${zipCode}`,
  );

  if (response.status === 200 && response.data) {
    const {data} = response;

    return {
      zipCode: data.codigo_postal,
      colonies: data.colonias,
      state: data.estado,
      municipality: data.municipio,
    };
  }

  throw new Error('Some Wrong');
}

export const zipCodeServices = {
  getInfo,
};
