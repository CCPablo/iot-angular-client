import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './page/devices/devices.component';
import { LoginComponent } from './page/login/login.component';
import { TemperatureComponent } from './page/temperature/temperature.component';


import { EngineComponent } from './renderers/threeJS/engine.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FlexLayoutModule } from "@angular/flex-layout";

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module'
/* Angular Flex Layout */
import { CanvasComponent } from './renderers/canvas/canvas.component';
import { SidebarModule } from 'ng-sidebar';
import { HomeComponent } from './page/home/home.component';
import { ControlComponent } from './page/control/control.component'

import { JwtInterceptor } from './authentication/interceptor/jwt.interceptor';
import { ToolbarComponent } from './main-view/toolbar/toolbar.component';
import { NavbarComponent } from './main-view/navbar/navbar.component';
import { AemetComponent } from './page/aemet/aemet.component';
import { ProfileSheetComponent } from './main-view/toolbar/profile-sheet.component';
import { UnitItemComponent } from './page/devices/unit-item/unit-item.component';

import { MatAnimatedIconComponent } from './main-view/mat-animated-icon/mat-animated-icon.component'

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    EngineComponent,
    HomeComponent,
    LoginComponent,
    CanvasComponent,
    ControlComponent,
    ToolbarComponent,
    NavbarComponent,
    TemperatureComponent,
    AemetComponent,
    ProfileSheetComponent,
    UnitItemComponent,
    MatAnimatedIconComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SidebarModule,
    Ng5SliderModule,
    AngularMaterialModule,
    FlexLayoutModule
   ],
  providers: [
    CanvasComponent,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
