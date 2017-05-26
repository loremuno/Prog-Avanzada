import { Component, DoCheck, KeyValueDiffers, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ParametrosService } from '../../servicios/parametros.service'
import { Pais } from '../../clases/Pais';
import { Provincia } from '../../clases/Provincia';
import { Departamento } from '../../clases/Departamento';
import { Localidad } from '../../clases/Localidad';

interface Options {
    value: string;
    label: string;
}

@Component({
    selector: 'app-localidad-select',
    templateUrl: './localidad-select.component.html',
    styleUrls: ['./localidad-select.component.css'],
    providers: [ParametrosService]
})

export class LocalidadSelectComponent implements OnInit, DoCheck {
    differ: any;
    Localidad = new Localidad();
    options: Options[] = [];
     @Input() lleno:boolean;
    @Input() disabled: boolean = true;
    @Input() todos: boolean;
    @Input() placeholder: string;
    @Input() Departamento: Departamento;
    ngDoCheck() {
        this.lleno = this.lleno;
        var changes = this.differ.diff(this.Departamento);
        if (changes) {
            this.options.splice(0);
            this.Localidad.todos = this.todos;

            this.Localidad.ProvinciaID = this.Departamento.ProvinciaID;
            this.Localidad.ProvinciaDescrip = this.Departamento.ProvinciaDescrip;
            this.Localidad.PaisDescrip = this.Departamento.PaisDescrip;
            this.Localidad.PaisID = this.Departamento.PaisID;
            this.Localidad.DepartamentoDescrip = this.Departamento.DepartamentoDescrip;
            this.Localidad.DepartamentoID = this.Departamento.DepartamentoID;
            this.parametrosservice.getLocalidadByFilters(this.Localidad).subscribe(
                data => {
                    data = data.json();
                    var data1: any = data;
                    for (var i = 0; i < data1.length; i++) {
                        let options: Options = {
                            value: data1[i].LocalidadID,
                            label: data1[i].LocalidadDescrip
                        }
                        this.options.push(options);

                    }
                    this.disabled = false;
                    if (data1.length == 1) {
                        this.disabled = true;
                        this.placeholder = this.options[0].label;
                        this.onSelected(this.options[0]);
                    }
                }
            );
        }

    }
    @Output() localidadUpdate = new EventEmitter<Localidad>();

    constructor(private differs: KeyValueDiffers, private parametrosservice: ParametrosService) {
        this.differ = differs.find({}).create(null);
    }

    ngOnInit() {
    }

    onSelected(item: Options) {
        this.Localidad.LocalidadID = parseInt(item.value);
        this.Localidad.LocalidadDescrip = item.label;
        this.localidadUpdate.emit(this.Localidad);
    }

}
