import { Component } from '@angular/core';
import { DashboardManager } from '../../../dashboard/src/lib/services/dashboard-manager';
import { Home } from './components/home/home';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'dashboard-framework';

  constructor(private dashboardManager: DashboardManager) {
    // Kullanıcı kendi widget'ını ekliyor
    this.dashboardManager.registerWidget({
      id: 8,
      label: 'Anasayfa',
      content: Home,
      rows: 2,
      columns: 2,
      backgroundColor: '#4CAF50',
    });
  }

  leftSidenavOpen = true;
  isMinimized = false;

  toggleLeftSidenav() {
    this.leftSidenavOpen = !this.leftSidenavOpen;
  }

  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }
  // Minimize fixed
  get drawerWidth(): string {
    return this.isMinimized ? '80px' : '240px';
  }
}
