import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

import { LayoutComponent } from './components/layout/layout.component';
import { AlertComponent } from './components/alert/alert.component';

@NgModule({
  declarations: [LayoutComponent, AlertComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
})
export class SharedModule {}
