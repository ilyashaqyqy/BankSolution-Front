import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouteService } from './services/route.service'; 
import { Observable , of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showSidebar$: Observable<boolean>= of(false);

  constructor(public authService: AuthService, private routeService: RouteService) {}

  ngOnInit() {
    this.showSidebar$ = this.routeService.isSidebarVisible();
    this.showSidebar$.subscribe(visible => {
      console.log('Sidebar visible:', visible); // Debugging line
    });
  }

  logout() {
    this.authService.logout();
  }
}
