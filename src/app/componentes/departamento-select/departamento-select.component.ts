import { Component, DoCheck, KeyValueDiffers, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ParametrosService } from '../../servicios/parametros.service'
import { Pais } from '../../clases/Pais';
import { Provincia } from '../../clases/Provincia';
import { Departamento } from '../../clases/Departamento';

interface Options {
    value: string;
    label: string;
}

@Component({
    selector: 'app-departamento-select',
    templateUrl: './departamento-select.component.html',
    styleUrls: ['./departamento-select.component.css'],
    providers: [ParametrosService]
})
export class DepartamentoSelectComponent implements OnInit,DoCheck {
    differ: any;
    Departamento = new Departamento();
    options: Options[] = [];
     @Input() lleno:boolean;
    @Input() todos: boolean;
    @Input() disabled: boolean = true;
    @Input() placeholder: string;
    @Input() Provincia: Provincia 
    @Output() departamentoUpdate = new EventEmitter<Departamento>();

    constructor(private differs: KeyValueDiffers, private parametrosservice: ParametrosService) {
        this.differ = differs.find({}).create(null);
    }

    ngDoCheck() {
        this.lleno = this.lleno;
        var changes = this.differ.diff(this.Provincia);
        if (changes) {
            this.options.splice(0);
            this.Departamento.todos = this.todos;
            this.Departamento.ProvinciaID = this.Provincia.ProvinciaID;
            this.Departamento.ProvinciaDescrip = this.Provincia.ProvinciaDescrip;
            this.Departamento.PaisDescrip = this.Provincia.PaisDescrip;
            this.Departamento.PaisID = this.Provincia.PaisID;
            this.Departamento.DepartamentoDescrip = null;
            this.Departamento.DepartamentoID = null;
            this.parametrosservice.getDepartamentoByFilters(this.Departamento).subscribe(
                data => {
                    data = data.json();
                    var data1: any = data;
                    for (var i = 0; i < data1.length; i++) {
                        let options: Options = {
                            value: data1[i].DepartamentoID,
                            label: data1[i].DepartamentoDescrip
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
    ngOnInit() {
    }

    onSelected(item: Options) {
        this.Departamento.DepartamentoID = parseInt(item.value);
        this.Departamento.DepartamentoDescrip = item.label;
        this.departamentoUpdate.emit(this.Departamento);
    }

}
