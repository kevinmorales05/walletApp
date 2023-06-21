import {ApiZipCodesConfig} from './api-config';
import {HttpClient} from './http-client';

export class ApiZipCodes extends HttpClient {
  private static classInstance?: ApiZipCodes;

  private constructor() {
    console.log(
      'AxiosRequestConfig ===> ApiConfigGrantCredentials ===> \n\n',
      JSON.stringify(ApiZipCodesConfig, null, 3),
    );

    super(ApiZipCodesConfig);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ApiZipCodes();
    }

    return this.classInstance;
  }

  public getRequest = (path: string, payload?: any) =>
    this.instance.get(path, payload);
}
