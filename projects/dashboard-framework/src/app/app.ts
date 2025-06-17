import { Component } from '@angular/core';
import { DashboardManager } from '../../../dashboard/src/lib/services/dashboard-manager';
import { Home } from './components/home/home';
import { Revenue } from './components/revenue/revenue';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App {
  protected title = 'dashboard-framework';

  constructor(private dashboardManager: DashboardManager) {
    const widgets = [
      {
        id: 8,
        label: 'Anasayfa',
        content: Home,
        rows: 2,
        columns: 2,
        backgroundColor: '#4CAF50',
      },
      {
        id: 9,
        label: 'Raporlar',
        content: Revenue,
        rows: 2,
        columns: 2,
        backgroundColor: '#2196F3',
      },
    ];

    // Tüm widget'ları kaydet
    widgets.forEach((widget) => this.dashboardManager.registerWidget(widget));
  }

  leftSidenavOpen = true;
  toggleLeftSidenav() {
    this.leftSidenavOpen = !this.leftSidenavOpen;
  }

  isMinimized = false;
  toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }

  // Minimize fixed
  get drawerWidth(): string {
    return this.isMinimized ? '80px' : '240px';
  }
}
