import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from 'src/app/shared/api.service';
import { Configuration } from 'src/app/configuration';
import { AuthenticationService } from './shared/authentication.service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ConfirmationDialogComponent } from './shared/confirmation-dialog/confirmation-dialog.component';
import { MatButtonModule, MatDialogModule, MatIconModule, MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { IconModule } from '@visurel/iconify-angular';
import { ProgressDialogComponent } from './shared/progress-dialog/progress-dialog.component';


@NgModule({
  declarations: [AppComponent, ConfirmationDialogComponent, ProgressDialogComponent],
  entryComponents: [
    ConfirmationDialogComponent,
    ProgressDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    IconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    // Vex
    VexModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthenticationService,
    ApiService,
    Configuration
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
