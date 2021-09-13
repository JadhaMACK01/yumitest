import { PostComponent } from './post/post.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {DetailSettingsComponent } from './detailSettings/detailSettings.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDetailComponent } from './dashboardDetail/dashboardDetail.component';
import { DashboardHomeComponent } from './dashboardHome/dashboardHome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  declarations: [
    
    DashboardDetailComponent,
   DashboardHomeComponent,
   DetailSettingsComponent,
   PostComponent,

  ],
  exports:[
    DashboardDetailComponent,
    DashboardHomeComponent,
    DetailSettingsComponent,
    PostComponent
  ]
})
export class DashboardModule {}
