import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable, Observer, Subject } from "rxjs/Rx";
import { Pais } from '../clases/pais';
import { Provincia } from '../clases/provincia';
import { Departamento } from '../clases/departamento';
import { Localidad } from '../clases/localidad';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Agencia } from '../clases/agencia-web-model';
import { environment } from '../../environments/environment';

@Injectable()
export class ParametrosService {

    constructor(private http: Http) {
    }
    getPaisALL(Pais: Pais) {
        return this.http.post('http://' + environment.ApiUrl + '/api/Parametros/PaisesALL', Pais);
    }
    getProvinciaByFilters(Provincia: Provincia) {
        return this.http.post('http://' + environment.ApiUrl + '/api/Parametros/ProvinciasByFilters', Provincia);
    }
    getLocalidadByFilters(Localidad: Localidad) {
        return this.http.post('http://' + environment.ApiUrl + '/api/Parametros/LocalidadesByFilters', Localidad);
    }
    getDepartamentoByFilters(Departamento: Departamento) {
        return this.http.post('http://' + environment.ApiUrl + '/api/Parametros/DepartamentosByFilters', Departamento);
    }
    getAgencia(Departamento: Departamento) {
        return this.http.post('http://' + environment.ApiUrl + '/api/Parametros/Agencias', Departamento);
    }
    getAgenciaDireccion(Departamento: Departamento) {
        return this.http.post('http://' + environment.ApiUrl + '/api/Parametros/AgenciasDireccion', Departamento);
    }
    actualizarCoordenadaAgencia(AgenciaID: number, Latitud: number, Longitud: number) {
        return this.http.get('http://' + environment.ApiUrl + '/api/Parametros/ActualizarAgencia?AgenciaID=' + AgenciaID + '&Latitud=' + Latitud + '&Longitud=' + Longitud);
    }
    getAgenciaDireccionDistancia(Latitud: number, Longitud: number, Distancia: number, todos: boolean) {
        return this.http.get('http://' + environment.ApiUrl + '/api/Parametros/AgenciasDireccionDistancia?Latitud=' + Latitud + '&Longitud=' + Longitud + '&Distancia=' + Distancia + '&todos=' + todos);
    }
}