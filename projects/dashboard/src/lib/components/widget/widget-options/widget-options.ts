import { Component, inject, input, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Widgets } from '../../../models/dashboard';
import { DashboardManager } from '../../../services/dashboard-manager';

@Component({
  selector: 'lib-widget-options',
  imports: [MatButtonModule, MatButtonToggleModule, MatIconModule],
  templateUrl: './widget-options.html',
  styleUrl: './widget-options.scss',
})
export class WidgetOptions {
  data = input.required<Widgets>();
  showOptions = model<boolean>(false);

  store = inject(DashboardManager);
}
