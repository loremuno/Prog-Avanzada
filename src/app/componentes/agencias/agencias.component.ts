import { Departamento } from '../../clases/departamento';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GeocodingApiService } from '../../servicios/geocoding-api-service.service';
import { ParametrosService } from '../../servicios/parametros.service'
import { Agencia } from '../../clases/agencia-web-model'
import { Pais } from '../../clases/Pais'
import { Provincia } from '../../clases/Provincia'
import { GeolocationService } from '../../servicios/geolocation.service'
import { SpinnerComponent } from '../spinner/spinner.component'
import { GeoService } from '../../servicios/geo.service'

declare var $: any;

// just an interface for type safety.
interface marker {
  lat: any;
  lng: any;
  label?: string;
  draggable: boolean;
  name: string;
  direccion: string;
  tipocontacto: string;
  valorcontacto: string;
}
interface PPDL {
  nombre: string;
  id: number;
  objeto: number;
}
interface Options {
  value: number;
  label: string;
}
@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrls: ['./agencias.component.css'],
  providers: [GeocodingApiService, ParametrosService, GeolocationService, GeoService]
})

export class AgenciasComponent implements OnInit {
  public isRequesting: boolean;
  options: Options[] = [
    { value: 5000, label: '5000' },
    { value: 7500, label: '7500' },
    { value: 10000, label: '10000' },
    { value: 20000, label: '20000' },
    { value: 30000, label: '30000' }
  ];
  LatitudActual: number;
  LongitudActual: number;
  LatVista: number;
  LngVista: number;
  tab1: boolean = true;
  tab2: boolean = false;
  placeholderPais = "Pais"
  placeholderProvincia = "Provincia"
  placeholderDepartamento = "Departamento"
  PPDL: PPDL;
  Pais = new Pais();
  Provincia = new Provincia();
  Departamento = new Departamento();
  Agencias: Agencia[] = [];
  // google maps zoom level
  zoom: number = 10;

  selectedValue: number;
  filtro = false;

  session: any;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {

  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }


  markers: marker[] = [];
  constructor(private geoservice: GeoService, private GeolocationService: GeolocationService, private parametrosService: ParametrosService, private geocodingApiService: GeocodingApiService) {
  }

  onSelectedDistancia(item: Options) {
    this.Agencias.splice(0);
    this.isRequesting = true;
    this.markers.splice(0);
    this.localizar();
    this.parametrosService.getAgenciaDireccionDistancia(this.LatitudActual, this.LongitudActual, item.value, true).subscribe(
      data => {
        data = data.json();
        let data1: any;
        data1 = data;
        data1.forEach(element => {
          if (element.Latitud == undefined || element.Longitud == undefined) {

            this.geocodingApiService.findFromAddress(element.Calle + ' ' + element.Nume, '', element.LocalidadDescrip, element.ProvinciaDescrip, '', element.PaisDescrip).subscribe(
              data => {
                this.markers.push(
                  {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng,
                    label: '',
                    draggable: false,
                    name: element.Nombre1,
                    direccion: element.Calle + ' ' + element.Nume,
                    tipocontacto: element.TipoMedioContactoDescrip,
                    valorcontacto: element.MedioContactoValor
                  }
                );
                let agencia = new Agencia();
                agencia.Latitud = data.results[0].geometry.location.lat;
                agencia.Longitud = data.results[0].geometry.location.lng;
                agencia.Nombre = element.Nombre1;
                agencia.Direccion = element.Calle + ' ' + element.Nume;
                agencia.Telefono = element.MedioContactoValor;
                agencia.TipoContacto = element.TipoMedioContactoDescrip
                agencia.AgenciaID = element.AgenciaID;
                agencia.TipoAgenciaDescrip = element.TipoAgenciaDescrip;
                this.Agencias.push(agencia);
                this.parametrosService.actualizarCoordenadaAgencia(agencia.AgenciaID, agencia.Latitud, agencia.Longitud);
                this.isRequesting = false;
              }
            )
          }
          else {
            this.markers.push(
              {
                lat: element.Latitud,
                lng: element.Longitud,
                label: '',
                draggable: false,
                name: element.Nombre1,
                direccion: element.Calle + ' ' + element.Nume,
                tipocontacto: element.TipoMedioContactoDescrip,
                valorcontacto: element.MedioContactoValor
              }
            );
            let agencia = new Agencia();
            agencia.Latitud = element.Latitud;
            agencia.Longitud = element.Longitud;
            agencia.Nombre = element.Nombre1;
            agencia.Direccion = element.Calle + ' ' + element.Nume;
            agencia.Telefono = element.MedioContactoValor;
            agencia.TipoContacto = element.TipoMedioContactoDescrip
            agencia.TipoAgenciaDescrip = element.TipoAgenciaDescrip;
            this.Agencias.push(agencia);
            this.isRequesting = false;
          }
        });
      });
  }
  ngOnInit() {
    this.isRequesting = true;
    this.markers.splice(0);
    $(".tab1").addClass('tab-current');
    $("#section-linemove-5").slideToggle();
    this.GeolocationService.getCurrentPosition().subscribe(
      data => {
        let data1: any = data;
        this.LatitudActual = data1.coords.latitude;
        this.LongitudActual = data1.coords.longitude;
        this.LatVista = this.LatitudActual;
        this.LngVista = this.LongitudActual;
        this.markers.push(
          {
            lat: this.LatitudActual,
            lng: this.LongitudActual,
            label: 'Usted está aquí',
            draggable: false,
            name: '',
            direccion: '',
            tipocontacto: '',
            valorcontacto: ''
          }
        );
        this.isRequesting = false;
      },
      erro => {
        this.isRequesting = false;
      }
    )
    this.geoservice.getLocation({ timeout: 30000, enableHighAccuracy: true, maximumAge: 75000 }).subscribe(
      data => {
        let data1: any = data;
        this.LatitudActual = data1.coords.latitude;
        this.LongitudActual = data1.coords.longitude;
        this.markers.push(
          {
            lat: this.LatitudActual,
            lng: this.LongitudActual,
            label: 'Usted está aquí',
            draggable: false,
            name: '',
            direccion: '',
            tipocontacto: '',
            valorcontacto: ''
          }
        );
        this.isRequesting = false;
      },
      error => {
        this.isRequesting = false;
      }
    );

  }
  pppdlUpdate(ppdl: PPDL) {
    this.PPDL = ppdl;
  }
  departamentoUpdate(Departamento: Departamento) {
    if (this.tab2 == true) {
      this.isRequesting = true;
      this.markers.splice(0);
      this.localizar();
      this.Departamento = Departamento;
      this.Departamento.DepartamentoID = Departamento.DepartamentoID;
      this.agenciasFiltrosFunction();
    }
  }
  provinciaUpdate(Provincia: Provincia) {
    if (this.tab2 == true) {
      this.isRequesting = true;
      this.markers.splice(0);
      this.localizar();
      this.Provincia = Provincia;
      this.Departamento.DepartamentoID = null;
      this.Departamento.ProvinciaID = Provincia.ProvinciaID;
      this.isRequesting = false;
    }
  }
  paisUpdate(Pais: Pais) {
    if (this.tab2 == true) {
      this.isRequesting = true;
      this.markers.splice(0);
      this.localizar();
      this.Pais = Pais;
      this.Departamento.DepartamentoID = null;
      this.Departamento.ProvinciaID = null;
      this.Departamento.PaisID = Pais.PaisID;
      this.isRequesting = false;
    }
  }

  ocultarMapa() {
    $(".mapblock").slideToggle();
  }
  tab1a() {
    this.onSelectedDistancia(this.options[0]);
    if (this.tab2 == true) {
      this.tab2 = false;
      this.tab1 = true;
      $(".tab1").addClass('tab-current');
      $(".tab2").removeClass('tab-current');
      $("#section-linemove-4").slideToggle();
      $("#section-linemove-5").slideToggle();
    }
  }
  tab2a() {
    this.paisUpdate(this.Pais);
    if (this.tab1 == true) {
      this.tab1 = false;
      this.tab2 = true;
      $(".tab2").addClass('tab-current');
      $(".tab1").removeClass('tab-current');
      $("#section-linemove-4").slideToggle();
      $("#section-linemove-5").slideToggle();
    }
  }
  localizar() {

    this.markers.push(
      {
        lat: this.LatitudActual,
        lng: this.LongitudActual,
        label: 'Usted está aquí',
        draggable: false,
        name: '',
        direccion: '',
        tipocontacto: '',
        valorcontacto: ''
      }
    );
  }
  localizarPunto(item: any) {
    this.LatVista = item.Latitud;
    this.LngVista = item.Longitud;
    this.zoom = 16;
  }
  agenciasFiltrosFunction() {
    this.Agencias.splice(0);
    this.Departamento.todos = true;
    this.markers.splice(0);
    this.localizar();
    this.parametrosService.getAgenciaDireccion(this.Departamento).subscribe(
      data => {
        data = data.json();
        let data1: any;
        data1 = data;
        data1.forEach(element => {
          if (element.Latitud == undefined || element.Longitud == undefined) {

            this.geocodingApiService.findFromAddress(element.Calle + ' ' + element.Nume, '', element.LocalidadDescrip, element.ProvinciaDescrip, '', element.PaisDescrip).subscribe(
              data => {
                this.markers.push(
                  {
                    lat: data.results[0].geometry.location.lat,
                    lng: data.results[0].geometry.location.lng,
                    label: '',
                    draggable: false,
                    name: element.Nombre1,
                    direccion: element.Calle + ' ' + element.Nume,
                    tipocontacto: element.TipoMedioContactoDescrip,
                    valorcontacto: element.MedioContactoValor
                  }
                );
                let agencia = new Agencia();
                agencia.Latitud = data.results[0].geometry.location.lat;
                agencia.Longitud = data.results[0].geometry.location.lng;
                agencia.Nombre = element.Nombre1;
                agencia.Direccion = element.Calle + ' ' + element.Nume;
                agencia.Telefono = element.MedioContactoValor;
                agencia.TipoContacto = element.TipoMedioContactoDescrip
                agencia.AgenciaID = element.AgenciaID;
                agencia.TipoAgenciaDescrip = element.TipoAgenciaDescrip;
                this.Agencias.push(agencia);
                this.parametrosService.actualizarCoordenadaAgencia(agencia.AgenciaID, agencia.Latitud, agencia.Longitud).subscribe();
                this.isRequesting = false;
              }
            )
          }
          else {
            this.markers.push(
              {
                lat: element.Latitud,
                lng: element.Longitud,
                label: '',
                draggable: false,
                name: element.Nombre1,
                direccion: element.Calle + ' ' + element.Nume,
                tipocontacto: element.TipoMedioContactoDescrip,
                valorcontacto: element.MedioContactoValor
              }
            );
            let agencia = new Agencia();
            agencia.Latitud = element.Latitud;
            agencia.Longitud = element.Longitud;
            agencia.Nombre = element.Nombre1;
            agencia.Direccion = element.Calle + ' ' + element.Nume;
            agencia.Telefono = element.MedioContactoValor;
            agencia.TipoContacto = element.TipoMedioContactoDescrip;
            agencia.TipoAgenciaDescrip = element.TipoAgenciaDescrip;
            this.Agencias.push(agencia);
            this.isRequesting = false;
          }
        });
      },
      error => {
        this.isRequesting = false;
      }
    )
  }
}