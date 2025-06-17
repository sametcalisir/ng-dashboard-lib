import { Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomColorPalette } from '../../../../../dashboard-framework/src/app/services/custom-color-palette';
import { Theme } from '../../../../../dashboard-framework/src/app/services/theme';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'lib-toolbar',
  imports: [MatMenuModule, MatIconModule, MatToolbarModule, TitleCasePipe],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  protected themeService = inject(Theme);
  customThemeService = inject(CustomColorPalette);

  toggleSidenav = output<void>();

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
