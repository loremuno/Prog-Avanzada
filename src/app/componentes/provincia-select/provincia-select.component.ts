import { Component, KeyValueDiffers, Input, Output, OnChanges, EventEmitter, SimpleChange, DoCheck, OnInit } from '@angular/core';
import { ParametrosService } from '../../servicios/parametros.service'
import { Pais } from '../../clases/Pais';
import { Provincia } from '../../clases/Provincia';

interface Options {
    value: string;
    label: string;
}


@Component({
    selector: 'app-provincia-select',
    templateUrl: './provincia-select.component.html',
    styleUrls: ['./provincia-select.component.css'],
    providers: [ParametrosService]
})
export class ProvinciaSelectComponent implements OnInit, DoCheck {
    differ: any;
    Provincia = new Provincia();
    @Input() lleno:boolean;
    @Input() disabled: boolean = true;
    @Input() todos: boolean;
    @Input() placeholder: string;
    @Input() Pais: Pais;
    @Output() provinciaUpdate = new EventEmitter<Provincia>();
    options: Options[] = [];
    constructor(private differs: KeyValueDiffers, private parametrosservice: ParametrosService) {
        this.differ = differs.find({}).create(null);
    }

    ngOnInit() {
    }
    ngDoCheck() {
        this.lleno = this.lleno;
        var changes = this.differ.diff(this.Pais);
        if (changes) {
            this.options.splice(0);
            this.Provincia.todos = this.todos;
            this.Provincia.PaisID = this.Pais.PaisID;
            this.Provincia.PaisDescrip = this.Pais.PaisDescrip
            this.Provincia.ProvinciaID = null;
            this.Provincia.ProvinciaDescrip = null;
            this.parametrosservice.getProvinciaByFilters(this.Provincia).subscribe(
                data => {
                    data = data.json();
                    var data1: any = data;
                    for (var i = 0; i < data1.length; i++) {
                        let options: Options = {
                            value: data1[i].ProvinciaID,
                            label: data1[i].ProvinciaDescrip
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
    onSelected(item: Options) {
        this.Provincia.ProvinciaID = parseInt(item.value);
        this.Provincia.ProvinciaDescrip = item.label;
        this.provinciaUpdate.emit(this.Provincia);
    }

}

