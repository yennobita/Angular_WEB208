import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from '../layout/header/header.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { PopupComponentComponent } from './project-management/popup-component/popup-component.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MaterialExampleModule } from '../material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { PopupConfirmComponent } from '../share/popup-confirm/popup-confirm.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PagesComponent,
    HeaderComponent,
    ProjectManagementComponent,
    PopupComponentComponent,
    PopupConfirmComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MaterialExampleModule,
    MatNativeDateModule,
    MatPaginatorModule,
  ],
})
export class PagesModule {}
