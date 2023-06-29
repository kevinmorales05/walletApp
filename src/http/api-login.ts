import qs from 'qs';
import axios, {AxiosError} from 'axios';
import {store, setErrorAction} from '../reactRedux';
import {HttpClient} from './http-client';
import {ApiConfigGrantPassword} from './api-config';
import {GeneralApiProblem, getGeneralApiProblem} from './api-errors';

/**
 * Singleton Config to get Admin's token that allows to register new users (only).
 * Should not be mutated.
 */
export class ApiLogin extends HttpClient {
  private static classInstance?: ApiLogin;

  private constructor() {
    console.log(
      'AxiosRequestConfig ===> ApiConfigGrantPassword ===> \n\n',
      JSON.stringify(ApiConfigGrantPassword, null, 3),
    );
    super(ApiConfigGrantPassword);

    // Interceptors (only for debug purpose), please do not remove the "return" line,
    // is  necessary to prevent a very confusing error and spend sometime to debug it.
    // https://github.com/svrcekmichal/redux-axios-middleware/issues/83
    this.instance.interceptors.request.use(
      (request: any) => {
        const {headers, baseURL, method, url, data} = request;
        // console.log(
        //   'INTERCEPTOR - Starting Request ===> \n\n',
        //   JSON.stringify(headers, null, 3),
        //   '\n',
        //   `baseURL: ${baseURL}`,
        //   '\n',
        //   `url: ${url}`,
        //   '\n',
        //   `method: ${method}`,
        //   '\n',
        //   `data: ${JSON.stringify(data, null, 3)}`,
        // );

        if (
          request.data &&
          request.headers['Content-Type'] ===
            'application/x-www-form-urlencoded'
        ) {
          request.data = qs.stringify(request.data); // important! do not remove this line
        }
        console.log('data request', request.data);
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
      this.classInstance = new ApiLogin();
    }

    return this.classInstance;
  }

  async postRequest(path: string, payload: any) {
    return this.instance.post(path, payload);
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
