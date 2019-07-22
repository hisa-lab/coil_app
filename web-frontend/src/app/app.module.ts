import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoopBackConfig, SDKBrowserModule } from '../../lb-sdk';
import { CookieService } from 'ngx-cookie-service';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth.guard';
import { SuccessComponent } from './login/success/success.component';
import { FailedComponent } from './login/failed/failed.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { route } from './app.route';
import {
  NgSocialModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'ng-social';

import { AuthdataService } from './authdata.service';
import { TrydataService } from './trydata.service';
import { TryComponent } from './try/try.component';
import { CoilEditComponent } from './coil-edit/coil-edit.component';
import { ReviewComponent } from './review/review.component';
import { TopComponent } from './top/top.component';
import { DescriptionComponent } from './description/description.component';


@NgModule({
  declarations: [
    AppComponent,
    SuccessComponent,
    FailedComponent,
    HomeComponent,
    AuthComponent,
    TryComponent,
    CoilEditComponent,
    ReviewComponent,
    TopComponent,
    DescriptionComponent
  ],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    BrowserModule,
    CustomMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SDKBrowserModule.forRoot(),
    RouterModule.forRoot(route, { useHash: true }),
    NgSocialModule,
    MatIconModule,
    MatTabsModule,
    MatGridListModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatCardModule
  ],
  providers: [
    AuthdataService,
    TrydataService,
    CookieService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    LoopBackConfig.setBaseURL(window.location.protocol + '//' + window.location.host);
    LoopBackConfig.setApiVersion('api');
    LoopBackConfig.filterOnUrl();
    LoopBackConfig.filterOnHeaders();
  }
}
