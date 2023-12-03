import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export default class DefaultLayoutComponent {
  fetchStatus?: 'loading' | 'delayed' | 'success' | 'error';
  constructor(private router: Router) {
    router.events.subscribe((e: any) => {
      this.checkRouterEvent(e);
    });
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.fetchStatus = 'loading';
    }
    if (routerEvent instanceof NavigationEnd) {
      this.fetchStatus = 'success';
    }
    if (routerEvent instanceof NavigationError) {
      this.fetchStatus = 'error';
    }
    if (routerEvent instanceof NavigationCancel) {
      this.fetchStatus = 'delayed';
    }
  }

  cancel() {
    this.router.navigate([this.router.url]);
  }
}
