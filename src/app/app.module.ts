import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeviceComponent } from './page/devices/devices.component';
import { LoginComponent } from './page/login/login.component';
import { TemperatureComponent } from './page/temperature/temperature.component';
import { LightsComponent } from './page/lights/lights.component'

import { EngineComponent } from './renderers/threeJS/engine.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from 'ng2-charts';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module'
/* Angular Flex Layout */
import { CanvasComponent } from './renderers/canvas/canvas.component';
import { HomeComponent } from './page/home/home.component';
import { ControlComponent } from './page/control/control.component'

import { JwtInterceptor } from './authentication/interceptor/jwt.interceptor';
import { ToolbarComponent } from './main-view/toolbar/toolbar.component';
import { NavbarComponent } from './main-view/navbar/navbar.component';
import { AemetComponent } from './page/aemet/aemet.component';
import { ProfileSheetComponent } from './main-view/toolbar/profile-sheet.component';
import { UnitItemComponent } from './page/devices/unit-item/unit-item.component';
import { SensorChartComponent } from './page/devices/unit-item/sensor-chart/sensor-chart.component'

import { MatAnimatedIconComponent } from './main-view/mat-animated-icon/mat-animated-icon.component';
import { UnitIconComponent } from './unit-icon/unit-icon.component';
import { EditableTextComponent } from './editable-text/editable-text.component';
import { NodeItemComponent } from './page/devices/node-item/node-item.component';
import { LSensorChartComponent } from './page/graphs/l-sensor-chart/l-sensor-chart.component';
import { GraphsComponent } from './page/graphs/graphs.component';
import { GraphFormsComponent } from './page/graphs/graph-forms/graph-forms.component';
import { InputTimeComponent } from './input-time/input-time.component';
import { UnitImageUploadComponent } from './page/devices/unit-image-upload/unit-image-upload.component';


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
    MatAnimatedIconComponent,
    SensorChartComponent,
    LightsComponent,
    UnitIconComponent,
    EditableTextComponent,
    NodeItemComponent,
    GraphsComponent,
    LSensorChartComponent,
    GraphFormsComponent,
    InputTimeComponent,
    UnitImageUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ChartsModule
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
