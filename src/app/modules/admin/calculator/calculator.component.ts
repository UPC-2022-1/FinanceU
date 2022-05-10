import {
    Component,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { Bono } from 'app/models/bono';
import { BonoService } from 'app/services/bono.service';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CalculatorComponent implements OnInit, OnDestroy, OnChanges {
    private _bono: Bono;
    /**
     * Constructor
     */
    constructor(private _bonoService: BonoService) {}
    ngOnDestroy(): void {}
    ngOnChanges(): void {}
    ngOnInit(): void {}
}
