import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { DashboardManager } from '../../services/dashboard-manager';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardHeader } from './dashboard-header/dashboard-header';
import { wrapGrid } from 'animate-css-grid';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Widget } from '../../components/widget/widget';

@Component({
  selector: 'lib-dashboard',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CdkDropList,
    CdkDropListGroup,
    DashboardHeader,
    Widget,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  // inject() fonksiyonu constructor injection alternatifidir (Dashboard servisini enjekte eder)
  store = inject(DashboardManager);

  dashboard = viewChild.required<ElementRef>('dashboard');

  // Life cycle hook
  ngOnInit() {
    wrapGrid(this.dashboard().nativeElement, { duration: 300 });
  }

  // Handling Drop Events and Updating Widget Positions
  drop(event: CdkDragDrop<number, any>) {
    const {
      previousContainer,
      container,
      item: { data },
    } = event;

    if (data) {
      this.store.insertWidgetAtPosition(data, container.data);
      return;
    }
    this.store.updateWidgetPosition(previousContainer.data, container.data);
  }
}
