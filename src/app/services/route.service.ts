// RouteService
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  currentRoute$: Observable<string>;

  constructor(private router: Router) {
    this.currentRoute$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => event.urlAfterRedirects)
    );
  }

  isSidebarVisible(): Observable<boolean> {
   
    return this.currentRoute$.pipe(
      map(route => ['/dashboard', '/wallet', '/transaction/13', '/statistics', '/messages', '/profile', '/help', '/settings'].includes(route))
    );
  }
}
