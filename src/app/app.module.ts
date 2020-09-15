import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnitsDisplayComponent } from './page/units-display/units-display.component';
import { LoginComponent } from './page/login/login.component';
import { LightsComponent } from './components/lights/lights.component'

//import { EngineComponent } from './renderers/threeJS/engine.component';
import { ChartsModule } from 'ng2-charts';

/* Angular Material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module'
/* Angular Flex Layout */
import { HomeComponent } from './page/home/home.component';
import { ControlComponent } from './components/control/control.component'

import { JwtInterceptor } from './authentication/interceptor/jwt.interceptor';
import { AemetComponent } from './components/aemet/aemet.component'
import { UniCardComponent } from './page/units-display/unit-card/unit-card.component';

import { MatAnimatedIconComponent } from './components/mat-animated-icon/mat-animated-icon.component';
import { UnitIconComponent } from './components/unit-icon/unit-icon.component';
import { EditableTextComponent } from './components/editable-text/editable-text.component';
import { MainCardComponent } from './page/units-display/main-card/main-card.component';
import { LSensorChartComponent } from './page/graphs/l-sensor-chart/l-sensor-chart.component';
import { GraphsComponent } from './page/graphs/graphs.component';
import { GraphFormsComponent } from './page/graphs/graph-forms/graph-forms.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { UnitImageUploadComponent } from './components/unit-image-upload/unit-image-upload.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomSpinnerComponent } from './components/custom-spinner/custom-spinner.component';
import { ClimacellComponent } from './components/climacell/climacell.component';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToolbarbComponent } from './navigation/toolbarb/toolbarb.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component'

@NgModule({
  declarations: [
    AppComponent,
    UnitsDisplayComponent,
    //EngineComponent,
    HomeComponent,
    LoginComponent,
    ControlComponent,
    AemetComponent,
    UniCardComponent,
    MatAnimatedIconComponent,
    LightsComponent,
    UnitIconComponent,
    EditableTextComponent,
    MainCardComponent,
    GraphsComponent,
    LSensorChartComponent,
    GraphFormsComponent,
    InputTimeComponent,
    UnitImageUploadComponent,
    CustomSpinnerComponent,
    ClimacellComponent,
    ToolbarbComponent,
    SidenavComponent
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
    MatProgressSpinnerModule,
    DragDropModule
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
