import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './devices/devices.component';
import { LoginComponent } from './page/login/login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { EngineComponent } from './threeJS/engine.component';
import { Ng5SliderModule } from 'ng5-slider';


/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Flex Layout */
import { CanvasComponent } from './canvas/canvas.component';
import { SidebarModule } from 'ng-sidebar';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './page/home/home.component';
import { ControlComponent } from './page/control/control.component'

import { JwtInterceptor } from './authentication/interceptor/jwt.interceptor';
import { GraphComponent } from './graph/graph.component';

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
    GraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
    SidebarModule,
    Ng5SliderModule
   ],
  providers: [
    CanvasComponent,[{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
