import { Component, inject } from '@angular/core';
import { DashboardManager } from '../../../services/dashboard-manager';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-widgets-panel',
  imports: [CdkDrag, CdkDragPlaceholder, MatIconModule],
  templateUrl: './widgets-panel.html',
  styleUrl: './widgets-panel.scss',
})
export class WidgetsPanel {
  store = inject(DashboardManager);
}
