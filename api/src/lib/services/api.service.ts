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
import { appControllerGetStream } from '../fn/operations/app-controller-get-stream';
import { AppControllerGetStream$Params } from '../fn/operations/app-controller-get-stream';
import { fileControllerUploadFile } from '../fn/operations/file-controller-upload-file';
import { FileControllerUploadFile$Params } from '../fn/operations/file-controller-upload-file';
import { fileControllerUploadFiles } from '../fn/operations/file-controller-upload-files';
import { FileControllerUploadFiles$Params } from '../fn/operations/file-controller-upload-files';
import { fileControllerUploadMultiFieldFiles } from '../fn/operations/file-controller-upload-multi-field-files';
import { FileControllerUploadMultiFieldFiles$Params } from '../fn/operations/file-controller-upload-multi-field-files';
import { paymentControllerCreate } from '../fn/operations/payment-controller-create';
import { PaymentControllerCreate$Params } from '../fn/operations/payment-controller-create';

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

  /** Path part for operation `appControllerGetStream()` */
  static readonly AppControllerGetStreamPath = '/api/v1/stream';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `appControllerGetStream()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetStream$Response(params?: AppControllerGetStream$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return appControllerGetStream(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `appControllerGetStream$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  appControllerGetStream(params?: AppControllerGetStream$Params, context?: HttpContext): Observable<void> {
    return this.appControllerGetStream$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `paymentControllerCreate()` */
  static readonly PaymentControllerCreatePath = '/api/v1/payments';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `paymentControllerCreate()` instead.
   *
   * This method doesn't expect any request body.
   */
  paymentControllerCreate$Response(params?: PaymentControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return paymentControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `paymentControllerCreate$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  paymentControllerCreate(params?: PaymentControllerCreate$Params, context?: HttpContext): Observable<void> {
    return this.paymentControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `fileControllerUploadFile()` */
  static readonly FileControllerUploadFilePath = '/api/v1/file';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileControllerUploadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadFile$Response(params?: FileControllerUploadFile$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return fileControllerUploadFile(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileControllerUploadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadFile(params?: FileControllerUploadFile$Params, context?: HttpContext): Observable<void> {
    return this.fileControllerUploadFile$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `fileControllerUploadFiles()` */
  static readonly FileControllerUploadFilesPath = '/api/v1/file/multiple';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileControllerUploadFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadFiles$Response(params?: FileControllerUploadFiles$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return fileControllerUploadFiles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileControllerUploadFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadFiles(params?: FileControllerUploadFiles$Params, context?: HttpContext): Observable<void> {
    return this.fileControllerUploadFiles$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `fileControllerUploadMultiFieldFiles()` */
  static readonly FileControllerUploadMultiFieldFilesPath = '/api/v1/file/multiple-fields';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fileControllerUploadMultiFieldFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadMultiFieldFiles$Response(params?: FileControllerUploadMultiFieldFiles$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return fileControllerUploadMultiFieldFiles(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fileControllerUploadMultiFieldFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  fileControllerUploadMultiFieldFiles(params?: FileControllerUploadMultiFieldFiles$Params, context?: HttpContext): Observable<void> {
    return this.fileControllerUploadMultiFieldFiles$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
