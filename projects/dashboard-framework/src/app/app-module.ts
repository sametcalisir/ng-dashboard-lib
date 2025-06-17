import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './components/home/home';

// Material UI
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

// Dashboard Lib
import { DashboardModule } from '../../../dashboard/src/lib/dashboard-module';
import { Empty } from '../../../dashboard/src/lib/pages/dashboard/widgets/empty/empty';
import { Sidenav } from '../../../dashboard/src/lib/components/sidenav/sidenav';
import { WidgetsPanel } from '../../../dashboard/src/lib/pages/dashboard/widgets-panel/widgets-panel';
import { MatMenuModule } from '@angular/material/menu';
import { Widget } from '../../../dashboard/src/lib/components/widget/widget';
import { WidgetOptions } from '../../../dashboard/src/lib/components/widget/widget-options/widget-options';
import { Dashboard } from '../../../dashboard/src/lib/pages/dashboard/dashboard';
import { Toolbar } from '../../../dashboard/src/lib/components/toolbar/toolbar';
import { Revenue } from './components/revenue/revenue';

@NgModule({
  declarations: [App, Home, Revenue],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardModule,
    MatSidenavContent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatSidenavModule,
    WidgetsPanel,
    MatMenuModule,
    MatListModule,
    Empty,
    Sidenav,
    Widget,
    WidgetOptions,
    Dashboard,
    Toolbar,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
