import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './page/devices/devices.component';
import { LoginComponent } from './page/login/login.component';
import { TemperatureComponent } from './page/temperature/temperature.component';


import { EngineComponent } from './threeJS/engine.component';
import { Ng5SliderModule } from 'ng5-slider';
import { FlexLayoutModule } from "@angular/flex-layout";

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module'
/* Angular Flex Layout */
import { CanvasComponent } from './canvas/canvas.component';
import { SidebarModule } from 'ng-sidebar';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './page/home/home.component';
import { ControlComponent } from './page/control/control.component'

import { JwtInterceptor } from './authentication/interceptor/jwt.interceptor';
import { GraphComponent } from './graph/graph.component';
import { DeviceViewerComponent } from './device-viewer/device-viewer.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AemetComponent } from './aemet/aemet.component';

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    EngineComponent,
    HomeComponent,
    LoginComponent,
    CanvasComponent,
    HeaderComponent,
    ControlComponent,
    GraphComponent,
    DeviceViewerComponent,
    ToolbarComponent,
    NavbarComponent,
    TemperatureComponent,
    AemetComponent
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
