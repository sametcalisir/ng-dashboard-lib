import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WidgetsPanel } from '../widgets-panel/widgets-panel';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { DashboardManager } from '../../../services/dashboard-manager';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';

@Component({
  selector: 'lib-dashboard-header',
  imports: [
    MatIconModule,
    WidgetsPanel,
    MatMenuModule,
    MatButtonModule,
    CdkDropList,
  ],
  templateUrl: './dashboard-header.html',
  styleUrl: './dashboard-header.scss',
})
export class DashboardHeader {
  store = inject(DashboardManager);

  widgetsOpen = signal(false);

  widgetPutBack(event: CdkDragDrop<number, any>) {
    const { previousContainer } = event;
    this.store.removeWidget(previousContainer.data);
  }
}
