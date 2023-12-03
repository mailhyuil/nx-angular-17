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
import { fileControllerDownload } from '../fn/operations/file-controller-download';
import { FileControllerDownload$Params } from '../fn/operations/file-controller-download';
import { fileControllerUpload } from '../fn/operations/file-controller-upload';
import { FileControllerUpload$Params } from '../fn/operations/file-controller-upload';

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

  /** Path part for operation `fileControllerDownload()` */
  static readonly FileControllerDownloadPath = '/api/v1/file/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileControllerDownload()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerDownload$Response(params?: FileControllerDownload$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return fileControllerDownload(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileControllerDownload$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerDownload(params?: FileControllerDownload$Params, context?: HttpContext): Observable<void> {
    return this.fileControllerDownload$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `fileControllerUpload()` */
  static readonly FileControllerUploadPath = '/api/v1/file';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileControllerUpload()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUpload$Response(params?: FileControllerUpload$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return fileControllerUpload(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileControllerUpload$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUpload(params?: FileControllerUpload$Params, context?: HttpContext): Observable<void> {
    return this.fileControllerUpload$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
