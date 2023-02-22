import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HeaderComponent } from '../layout/header/header.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { PopupComponentComponent } from './project-management/popup-component/popup-component.component';

@NgModule({
  declarations: [PagesComponent, HeaderComponent, ProjectManagementComponent, PopupComponentComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class PagesModule {}
