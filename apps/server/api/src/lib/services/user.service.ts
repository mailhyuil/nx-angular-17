/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { userControllerCreate } from '../fn/user/user-controller-create';
import { UserControllerCreate$Params } from '../fn/user/user-controller-create';
import { userControllerFindAll } from '../fn/user/user-controller-find-all';
import { UserControllerFindAll$Params } from '../fn/user/user-controller-find-all';
import { userControllerFindById } from '../fn/user/user-controller-find-by-id';
import { UserControllerFindById$Params } from '../fn/user/user-controller-find-by-id';
import { userControllerRemove } from '../fn/user/user-controller-remove';
import { UserControllerRemove$Params } from '../fn/user/user-controller-remove';
import { userControllerUpdate } from '../fn/user/user-controller-update';
import { UserControllerUpdate$Params } from '../fn/user/user-controller-update';
import { UserDto } from '../models/user-dto';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `userControllerFindAll()` */
  static readonly UserControllerFindAllPath = '/api/v1/users';

  /**
   * 모든 User 목록 조회.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerFindAll()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindAll$Response(params?: UserControllerFindAll$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserDto>>> {
    return userControllerFindAll(this.http, this.rootUrl, params, context);
  }

  /**
   * 모든 User 목록 조회.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerFindAll$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindAll(params?: UserControllerFindAll$Params, context?: HttpContext): Observable<Array<UserDto>> {
    return this.userControllerFindAll$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserDto>>): Array<UserDto> => r.body)
    );
  }

  /** Path part for operation `userControllerCreate()` */
  static readonly UserControllerCreatePath = '/api/v1/users';

  /**
   * User 생성.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerCreate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreate$Response(params: UserControllerCreate$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userControllerCreate(this.http, this.rootUrl, params, context);
  }

  /**
   * User 생성.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerCreate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreate(params: UserControllerCreate$Params, context?: HttpContext): Observable<void> {
    return this.userControllerCreate$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerFindById()` */
  static readonly UserControllerFindByIdPath = '/api/v1/users/{id}';

  /**
   * User을 id로 조회.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerFindById()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindById$Response(params: UserControllerFindById$Params, context?: HttpContext): Observable<StrictHttpResponse<UserDto>> {
    return userControllerFindById(this.http, this.rootUrl, params, context);
  }

  /**
   * User을 id로 조회.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerFindById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerFindById(params: UserControllerFindById$Params, context?: HttpContext): Observable<UserDto> {
    return this.userControllerFindById$Response(params, context).pipe(
      map((r: StrictHttpResponse<UserDto>): UserDto => r.body)
    );
  }

  /** Path part for operation `userControllerRemove()` */
  static readonly UserControllerRemovePath = '/api/v1/users/{id}';

  /**
   * User 삭제.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerRemove()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerRemove$Response(params: UserControllerRemove$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userControllerRemove(this.http, this.rootUrl, params, context);
  }

  /**
   * User 삭제.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerRemove$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerRemove(params: UserControllerRemove$Params, context?: HttpContext): Observable<void> {
    return this.userControllerRemove$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `userControllerUpdate()` */
  static readonly UserControllerUpdatePath = '/api/v1/users/{id}';

  /**
   * User 수정.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerUpdate()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdate$Response(params: UserControllerUpdate$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return userControllerUpdate(this.http, this.rootUrl, params, context);
  }

  /**
   * User 수정.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerUpdate$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerUpdate(params: UserControllerUpdate$Params, context?: HttpContext): Observable<void> {
    return this.userControllerUpdate$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
