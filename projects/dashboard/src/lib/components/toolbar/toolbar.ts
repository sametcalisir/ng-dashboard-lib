import { Component, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-toolbar',
  imports: [MatMenuModule, MatIconModule, MatToolbarModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  toggleSidenav = output<void>();

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }
}
