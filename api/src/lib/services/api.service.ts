/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { appControllerGetData } from '../fn/operations/app-controller-get-data';
import { AppControllerGetData$Params } from '../fn/operations/app-controller-get-data';

@Injectable({ providedIn: 'root' })
export class ApiService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `appControllerGetData()` */
  static readonly AppControllerGetDataPath = '/api/v1';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerGetData()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetData$Response(params?: AppControllerGetData$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return appControllerGetData(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `appControllerGetData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetData(params?: AppControllerGetData$Params, context?: HttpContext): Observable<void> {
    return this.appControllerGetData$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
