import {store, setErrorAction} from '../reactRedux';
import axios, {AxiosError} from 'axios';
import {HttpClient} from './http-client';
import {ApiConfig} from './api-config';
import {GeneralApiProblem, getGeneralApiProblem} from './api-errors';

/**
 * Singleton Config to consume every context in the Aurum Core API.
 * Should not be mutated.
 */
export class ApiAurum extends HttpClient {
  // In a singleton, always the instance should be private.
  // However in this case we need change for a public because
  // we need to raise the instance 2 times and each one with a different configuration.
  static classInstance?: ApiAurum;

  private constructor() {
    console.log(
      'AxiosRequestConfig ===> ApiConfig ===> \n\n',
      JSON.stringify(ApiConfig(), null, 3),
    );

    super(ApiConfig());

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use(
      (request: any) => {
        const {headers, baseURL, method, url, data} = request;
        console.log(
          'INTERCEPTOR - Starting Request ===> \n\n',
          JSON.stringify(headers, null, 3),
          '\n',
          `baseURL: ${baseURL}`,
          '\n',
          `url: ${url}`,
          '\n',
          `method: ${method}`,
          '\n',
          `data: ${JSON.stringify(data, null, 3)}`,
        );

        return request;
      },
      (error: any) =>
        console.log(
          'INTERCEPTOR Request Error ===> \n\n',
          JSON.stringify(error, null, 3),
        ),
    );

    this.instance.interceptors.response.use(
      (response: any) => {
        const {data} = response;
        console.log(
          'INTERCEPTOR - The Response is ===> \n\n',
          JSON.stringify(data, null, 3),
        );
        return response;
      },
      (error: any) => {
        console.log(
          'INTERCEPTOR Response Error ===> \n\n',
          JSON.stringify(error, null, 3),
        );
        this.handlerError(error);
        return Promise.reject(error);
      },
    );
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new ApiAurum();
    }

    return this.classInstance;
  }

  async postRequest(path: string, payload: any) {
    return this.instance.post(path, payload);
  }

  async getRequest(path: string, payload?: any) {
    return this.instance.get(path, payload);
  }

  private handlerError = (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
      // Access to config, request, and response, etc...
      const problem: GeneralApiProblem = getGeneralApiProblem(
        err.response.status,
      );
      if (problem) store.dispatch(setErrorAction(problem.kind));
    } else {
      store.dispatch(setErrorAction('UNKNOWN ERROR'));
    }
  };
}
