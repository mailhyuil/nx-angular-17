import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'nx-angular-17-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  private static _httpClient?: HttpClient;

  constructor(private readonly httpClient: HttpClient) {
    if (this.httpClient) {
      AppComponent._httpClient = this.httpClient;
    }
  }
  static getHttpClient() {
    return AppComponent._httpClient;
  }
  ngOnInit(): void {}
}
