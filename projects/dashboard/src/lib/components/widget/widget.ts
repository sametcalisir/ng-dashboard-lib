import { Component, HostBinding, input, signal } from '@angular/core';
import { Widgets } from '../../.././lib/models/dashboard';
import { NgComponentOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { WidgetOptions } from './widget-options/widget-options';
import { CdkDrag, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'lib-widget',
  imports: [
    NgComponentOutlet,
    MatButtonModule,
    MatIconModule,
    WidgetOptions,
    CdkDrag,
    CdkDragPlaceholder,
    MatCardModule,
  ],
  templateUrl: './widget.html',
  styleUrl: './widget.scss',
})
export class Widget {
  data = input.required<Widgets>();

  // Widget seçeneklerinin görünürlüğünü kontrol eder.
  showOptions = signal(false);

  // Widget'ın grid alanını dinamik olarak ayarlar
  @HostBinding('style.grid-area')
  get gridArea() {
    return `span ${this.data()?.rows ?? 1} / span ${this.data()?.columns ?? 1}`;
  }
}
