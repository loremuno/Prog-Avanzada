import { Component, KeyValueDiffers, Output, Input, EventEmitter, DoCheck, OnInit } from '@angular/core';
import { ParametrosService } from '../../servicios/parametros.service'
import { Pais } from '../../clases/Pais';

interface Options {
    value: string;
    label: string;
}

@Component({
    selector: 'app-pais-select',
    templateUrl: './pais-select.component.html',
    styleUrls: ['./pais-select.component.css'],
    providers: [ParametrosService]
})
export class PaisSelectComponent implements OnInit, DoCheck {
    public disabled: boolean = false;
    @Input() lleno: boolean;
    @Input() placeholder: string;
    @Input() Pais: Pais;
    options: Options[] = [];
    @Output() paisUpdate = new EventEmitter<Pais>();
    @Input() todos: boolean;
    differ: any;

    constructor(private differs: KeyValueDiffers, private parametrosservice: ParametrosService) {
        this.differ = differs.find({}).create(null);
        this.Pais = new Pais();

    }

    ngDoCheck() {
        this.lleno = this.lleno;
        var changes = this.differ.diff(this.Pais);
        if (changes) {
            this.Pais.todos = this.todos;
            this.options.splice(0);
            this.parametrosservice.getPaisALL(this.Pais).subscribe(
                data => {
                    data = data.json();
                    var data1: any = data;
                    for (var i = 0; i < data1.length; i++) {
                        let options: Options = {
                            value: data1[i].PaisID,
                            label: data1[i].PaisDescrip
                        }
                        this.options.push(options);
                    }
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
        this.options.splice(0);

        this.Pais.todos = this.todos;

        this.parametrosservice.getPaisALL(this.Pais).subscribe(
            data => {
                data = data.json();
                var data1: any = data;
                for (var i = 0; i < data1.length; i++) {
                    let options: Options = {
                        value: data1[i].PaisID,
                        label: data1[i].PaisDescrip
                    }
                    this.options.push(options);
                }
                if (data1.length == 1) {
                    this.disabled = true;
                    this.placeholder = this.options[0].label;
                    this.onSelected(this.options[0]);
                }

            }
        );
    }

    onSelected(item: Options) {
        this.Pais.PaisID = parseInt(item.value);
        this.Pais.PaisDescrip = item.label;
        this.paisUpdate.emit(this.Pais);
    }
}
