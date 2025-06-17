import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from '../../../dashboard/src/lib/pages/dashboard/dashboard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
