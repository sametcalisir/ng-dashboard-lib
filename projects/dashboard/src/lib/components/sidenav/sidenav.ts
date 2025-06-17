import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatListModule, MatNavList } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
};

@Component({
  selector: 'lib-sidenav',
  imports: [
    MatIconModule,
    MatNavList,
    MatDivider,
    RouterLink,
    MatMenuTrigger,
    CommonModule,
    MatMenuModule,
    MatListModule,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  collapsed = input<boolean>(false);
  isMinimized = input<boolean>(false);

  toggleMinimize = output<void>();

  menuItems = signal<MenuItem[]>([
    {
      icon: 'home',
      label: 'Home',
      route: 'home',
    },

    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dashboard',
    },

    {
      icon: 'analytics',
      label: 'Analytics',
      route: 'analytics',
    },
  ]);

  onToggleMinimize() {
    this.toggleMinimize.emit();
  }
}
