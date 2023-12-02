import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly httpClient: HttpClient) {}
  getCount() {
    console.log('getCount');
    return this.httpClient.get('http://localhost:3000/api/v1');
  }
}
