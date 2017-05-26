import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { AgenciasComponent } from './componentes/agencias/agencias.component';
import { PaisSelectComponent } from './componentes/pais-select/pais-select.component';
import { ProvinciaSelectComponent } from './componentes/provincia-select/provincia-select.component';
import { DepartamentoSelectComponent } from './componentes/departamento-select/departamento-select.component';
import { LocalidadSelectComponent } from './componentes/localidad-select/localidad-select.component';
import { SpinnerComponent } from './componentes/spinner/spinner.component';

import { ParametrosService } from './servicios/parametros.service'

@NgModule({
  declarations: [
    AppComponent,
    AgenciasComponent,
    PaisSelectComponent,
    ProvinciaSelectComponent,
    DepartamentoSelectComponent,
    LocalidadSelectComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectModule,
    CommonModule,
    routing,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC7-MaJCGWiLFR24LqsE2GKExPUh_T1du4'
    })
  ],
  providers:[ParametrosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
