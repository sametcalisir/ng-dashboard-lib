import { CommonModule } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatNavList } from '@angular/material/list';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
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
    MatMenu,
    MatNavList,
    MatDivider,
    RouterLink,
    MatMenuTrigger,
    CommonModule,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  // Using input signals instead of @Input
  collapsed = input<boolean>(false);
  isMinimized = input<boolean>(false);

  // Using output instead of @Output (outputs are still the preferred way for events)
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
