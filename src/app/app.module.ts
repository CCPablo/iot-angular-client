import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NodeComponent } from './page/nodes/nodes.component';
import { LoginComponent } from './page/login/login.component';
import { TemperatureComponent } from './page/temperature/temperature.component';
import { LightsComponent } from './page/lights/lights.component'

//import { EngineComponent } from './renderers/threeJS/engine.component';
import { ChartsModule } from 'ng2-charts';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module'
/* Angular Flex Layout */
import { HomeComponent } from './page/home/home.component';
import { ControlComponent } from './page/control/control.component'

import { JwtInterceptor } from './authentication/interceptor/jwt.interceptor';
import { ToolbarComponent } from './main-view/toolbar/toolbar.component';
import { NavbarComponent } from './main-view/navbar/navbar.component';
import { AemetComponent } from './aemet/aemet.component'
import { ProfileSheetComponent } from './main-view/toolbar/profile-sheet.component';
import { UnitItemComponent } from './page/nodes/unit-item/unit-item.component';

import { MatAnimatedIconComponent } from './main-view/mat-animated-icon/mat-animated-icon.component';
import { UnitIconComponent } from './unit-icon/unit-icon.component';
import { EditableTextComponent } from './editable-text/editable-text.component';
import { NodeItemComponent } from './page/nodes/node-item/node-item.component';
import { LSensorChartComponent } from './page/graphs/l-sensor-chart/l-sensor-chart.component';
import { GraphsComponent } from './page/graphs/graphs.component';
import { GraphFormsComponent } from './page/graphs/graph-forms/graph-forms.component';
import { InputTimeComponent } from './input-time/input-time.component';
import { UnitImageUploadComponent } from './page/nodes/unit-image-upload/unit-image-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomSpinnerComponent } from './custom-spinner/custom-spinner.component';
import { ClimacellComponent } from './climacell/climacell.component';


@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    //EngineComponent,
    HomeComponent,
    LoginComponent,
    ControlComponent,
    ToolbarComponent,
    NavbarComponent,
    TemperatureComponent,
    AemetComponent,
    ProfileSheetComponent,
    UnitItemComponent,
    MatAnimatedIconComponent,
    LightsComponent,
    UnitIconComponent,
    EditableTextComponent,
    NodeItemComponent,
    GraphsComponent,
    LSensorChartComponent,
    GraphFormsComponent,
    InputTimeComponent,
    UnitImageUploadComponent,
    CustomSpinnerComponent,
    ClimacellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ChartsModule,
    MatProgressSpinnerModule
   ],
  providers: [
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }]],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
