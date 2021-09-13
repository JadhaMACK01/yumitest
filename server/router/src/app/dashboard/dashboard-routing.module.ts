import { PostComponent } from './post/post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboardHome/dashboardHome.component';
import { DashboardDetailComponent } from './dashboardDetail/dashboardDetail.component';
import { DetailSettingsComponent } from './detailSettings/detailSettings.component';

import { AuthGuard } from '../auth/auth.guard';

const adminRoutes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          { path: 'settings', component:DetailSettingsComponent },
          { path: 'posts', component: PostComponent },
          { path: '', component: DashboardDetailComponent        },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {}
