import {
    Component,
    OnChanges,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { Bono } from 'app/models/bono';
import { Indicadores } from 'app/models/indicadores';
import { IteracionCaja } from 'app/models/iteracionCaja';
import { BonoService } from 'app/services/bono.service';

@Component({
    selector: 'calculator',
    templateUrl: './calculator.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class CalculatorComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('bonoDataNgForm') bonoDataNgForm: NgForm;
    @ViewChild('indicadoresDataNgForm') indicadoresDataNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };

    public bono: Bono = new Bono();
    public tipoBono: 'AMERICANO' | 'ALEMAN' | 'FRANCES' = 'AMERICANO';
    public indicadores: Indicadores = new Indicadores();
    public bonoDataForm: FormGroup;
    public indicadoresDataForm: FormGroup;
    showAlert: boolean = false;

    public displayedColumns: string[] = [
        'position',
        'fechaProgramada',
        'inflacionAnual',
        'inflacion',
        'plazoGracia',
        'bono',
        'bonoIndexado',
        'cuponInteres',
        'cuota',
        'amortizacion',
        'prima',
        'escudo',
        'flujoEmisor',
        'flujoEmisorEscudo',
        'flujoBonista',
        'flujoAct',
        'faXPlazo',
        'factorConvexidad',
    ];

    /**
     * Constructor
     */
    constructor(
        private _bonoService: BonoService,
        private _formBuilder: FormBuilder
    ) { }
    ngOnDestroy(): void { }
    ngOnChanges(): void { }
    ngOnInit(): void {
        // Create the form
        this.calculate();
        this.bonoDataForm = this._formBuilder.group({
            moneda: [this.bono.moneda, Validators.required],
            valorNominal: [this.bono.valorNominal, Validators.required],
            valorComercial: [this.bono.valorComercial, Validators.required],
            numeroAnios: [this.bono.numeroAnios, Validators.required],
            frecuenciaCupon: [this.bono.frecuenciaCupon, Validators.required],
            diasXAnio: [this.bono.diasXAnio, Validators.required],
            tipoTasaInteres: [this.bono.tipoTasaInteres, Validators.required],
            capitalizacion: [this.bono.capitalizacion, Validators.required],
            tasaInteres: [this.bono.tasaInteres, Validators.required],
            tasaAnualDescuento: [
                this.bono.tasaAnualDescuento,
                Validators.required,
            ],
            fechaEmision: [this.bono.fechaEmision, Validators.required],
            impuestoRenta: [this.bono.impuestoRenta, Validators.required],
            prima: [this.bono.prima, Validators.required],
            estructuracion: [this.bono.estructuracion, Validators.required],
            colocacion: [this.bono.colocacion, Validators.required],
            flotacion: [this.bono.flotacion, Validators.required],
            cavali: [this.bono.cavali, Validators.required],
            tipoBono: [this.bono.tipoBono, Validators.required],
        });
        this.indicadoresDataForm = this._formBuilder.group({
            frecuenciaCupon: [this.indicadores.frecuenciaCupon],
            diasCapitalizacion: [this.indicadores.diasCapitalizacion],
            periodosAnio: [this.indicadores.periodosAnio],
            totalPeriodos: [this.indicadores.totalPeriodos],
            tasaEfectivaAnual: [this.indicadores.tasaEfectivaAnual],
            tasaEfectiva: [this.indicadores.tasaEfectiva],
            cok: [this.indicadores.cok],
            costesInicialesEmisor: [this.indicadores.costesInicialesEmisor],
            costesInicialesBonista: [this.indicadores.costesInicialesBonista],
            precioActual: [this.indicadores.precioActual],
            utilidadPerdida: [this.indicadores.utilidadPerdida],
            duracion: [this.indicadores.duracion],
            convexidad: [this.indicadores.convexidad],
            total: [this.indicadores.total],
            duracionModificada: [this.indicadores.duracionModificada],
            tceaEmisor: [this.indicadores.tceaEmisor],
            tceaEmisorEscudo: [this.indicadores.tceaEmisorEscudo],
            treaBonista: [this.indicadores.treaBonista],
            flujoCaja: [this.indicadores.flujoCaja],
        });

        this.bonoDataForm.valueChanges.subscribe((val) => {
            this.bonoDataForm.patchValue(val, { emitEvent: false });
            this.bono = this.bonoDataForm.value;
            this.calculate();
            this.indicadoresDataForm.setValue(this.indicadores);
        });

        this.indicadoresDataForm.valueChanges.subscribe((val) => {
            this.indicadoresDataForm.patchValue(val, { emitEvent: false });
        });
    }

    calculate(): void {
        try {
            this.showAlert = false;
            switch (this.bono.frecuenciaCupon) {
                case 'MENSUAL':
                    this.indicadores.frecuenciaCupon = 30;
                    break;
                case 'BIMESTRAL':
                    this.indicadores.frecuenciaCupon = 60;
                    break;
                case 'TRIMESTRAL':
                    this.indicadores.frecuenciaCupon = 90;
                    break;
                case 'CUATRIMESTRAL':
                    this.indicadores.frecuenciaCupon = 120;
                    break;
                case 'SEMESTRAL':
                    this.indicadores.frecuenciaCupon = 180;
                    break;
                case 'ANUAL':
                    this.indicadores.frecuenciaCupon = 360;
                    break;
                default:
                    this.indicadores.frecuenciaCupon = 30;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.showAlert = false;
            switch (this.bono.capitalizacion) {
                case 'DIARIA':
                    this.indicadores.diasCapitalizacion = 1;
                    break;
                case 'QUINCENAL':
                    this.indicadores.diasCapitalizacion = 15;
                    break;
                case 'MENSUAL':
                    this.indicadores.diasCapitalizacion = 30;
                    break;
                case 'BIMESTRAL':
                    this.indicadores.diasCapitalizacion = 60;
                    break;
                case 'TRIMESTRAL':
                    this.indicadores.diasCapitalizacion = 90;
                    break;
                case 'SEMESTRAL':
                    this.indicadores.diasCapitalizacion = 180;
                    break;
                case 'ANUAL':
                    this.indicadores.diasCapitalizacion = 360;
                    break;
                default:
                    this.indicadores.diasCapitalizacion = 30;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.periodosAnio =
                this.bono.diasXAnio / this.indicadores.frecuenciaCupon;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.totalPeriodos =
                this.indicadores.periodosAnio * this.bono.numeroAnios;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            switch (this.bono.tipoTasaInteres) {
                case 'EFECTIVA':
                    this.indicadores.tasaEfectivaAnual = this.bono.tasaInteres;
                    break;
                case 'NOMINAL':
                    this.indicadores.tasaEfectivaAnual =
                        (1 +
                            this.bono.tasaInteres /
                            100 /
                            (this.bono.diasXAnio /
                                this.indicadores.diasCapitalizacion)) **
                        (this.bono.diasXAnio /
                            this.indicadores.diasCapitalizacion);
                    this.indicadores.tasaEfectivaAnual *= 100;
                    break;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.tasaEfectiva =
                (1 + this.indicadores.tasaEfectivaAnual / 100) **
                (this.indicadores.frecuenciaCupon / this.bono.diasXAnio) -
                1;
            this.indicadores.tasaEfectiva *= 100;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.cok =
                (1 + this.bono.tasaAnualDescuento / 100) **
                (this.indicadores.frecuenciaCupon / this.bono.diasXAnio) -
                1;
            this.indicadores.cok *= 100;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.costesInicialesEmisor =
                ((this.bono.estructuracion +
                    this.bono.colocacion +
                    this.bono.flotacion +
                    this.bono.cavali) /
                    100) *
                this.bono.valorComercial;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.costesInicialesBonista =
                ((this.bono.flotacion + this.bono.cavali) / 100) *
                this.bono.valorComercial;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.costesInicialesBonista =
                ((this.bono.flotacion + this.bono.cavali) / 100) *
                this.bono.valorComercial;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }
        try {
            this.indicadores.flujoCaja = [];
            this.indicadores.flujoCaja.push(new IteracionCaja(
                {
                    fechaProgramada: this.bono.fechaEmision,
                    inflacionAnual: null,
                    inflacion: null,
                    plazoGracia: null,
                    bono: null,
                    bonoIndexado: null,
                    cuponInteres: null,
                    cuota: null,
                    amortizacion: null,
                    prima: null,
                    escudo: null,
                    flujoEmisor: this.bono.valorComercial - this.indicadores.costesInicialesEmisor,
                    flujoEmisorEscudo: this.bono.valorComercial - this.indicadores.costesInicialesEmisor,
                    flujoBonista: this.bono.valorComercial - this.indicadores.costesInicialesBonista,
                    flujoAct: null,
                    faXPlazo: null,
                    factorConvexidad: null,
                }));
            for (let i = 1; i < this.indicadores.totalPeriodos + 1; i++) {
                const flujoActual = new IteracionCaja({
                    fechaProgramada: new Date(this.bono.fechaEmision.getTime() + (i * this.indicadores.frecuenciaCupon * 24 * 60 * 60 * 1000)),
                    inflacionAnual: 0,
                    inflacion: { value: 0, type: this.bono.frecuenciaCupon },
                    plazoGracia: 'S',
                    bono: i === 1 ? this.bono.valorNominal :
                        (this.indicadores.flujoCaja[i - 1].plazoGracia === 'T' ?
                            this.indicadores.flujoCaja[i - 1].bonoIndexado - this.indicadores.flujoCaja[i - 1].cuponInteres :
                            this.indicadores.flujoCaja[i - 1].bonoIndexado + this.indicadores.flujoCaja[i - 1].amortizacion),
                    bonoIndexado: null,
                    cuponInteres: null,
                    cuota: null,
                    amortizacion: null,
                    prima: null,
                    escudo: null,
                    flujoEmisor: this.bono.valorComercial - this.indicadores.costesInicialesEmisor,
                    flujoEmisorEscudo: this.bono.valorComercial - this.indicadores.costesInicialesEmisor,
                    flujoBonista: this.bono.valorComercial - this.indicadores.costesInicialesBonista,
                    flujoAct: null,
                    faXPlazo: null,
                    factorConvexidad: null,
                });

                flujoActual.bonoIndexado = flujoActual.bono * (1 + flujoActual.inflacion.value);
                flujoActual.cuponInteres = flujoActual.bonoIndexado * this.indicadores.tasaEfectiva / 100;
                flujoActual.prima = i === this.indicadores.totalPeriodos ? this.bono.valorNominal * this.bono.prima / 100 : 0;
                flujoActual.escudo = flujoActual.bonoIndexado * this.bono.impuestoRenta / 100;

                switch (this.tipoBono) {
                    case 'AMERICANO':
                        break;
                    case 'ALEMAN':
                        break;
                    case 'FRANCES':
                        break;
                }
                this.indicadores.flujoCaja.push(flujoActual);
            }
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this.showAlert = true;
        }


        this.indicadores.cok = parseFloat(this.indicadores.cok.toFixed(3));
        this.indicadores.tasaEfectiva = parseFloat(this.indicadores.tasaEfectiva.toFixed(3));
        this.indicadores.tasaEfectivaAnual = parseFloat(this.indicadores.tasaEfectivaAnual.toFixed(5));
        this.indicadores.costesInicialesBonista = parseFloat(this.indicadores.costesInicialesBonista.toFixed(2));
        this.indicadores.costesInicialesEmisor = parseFloat(this.indicadores.costesInicialesEmisor.toFixed(2));
        this.indicadores.precioActual = parseFloat(this.indicadores.precioActual.toFixed(2));
        this.indicadores.utilidadPerdida = parseFloat(this.indicadores.utilidadPerdida.toFixed(2));
        this.indicadores.duracion = parseFloat(this.indicadores.duracion.toFixed(2));
        this.indicadores.convexidad = parseFloat(this.indicadores.convexidad.toFixed(2));
        this.indicadores.total = parseFloat(this.indicadores.total.toFixed(2));
        this.indicadores.duracionModificada = parseFloat(this.indicadores.duracionModificada.toFixed(2));
        this.indicadores.tceaEmisor = parseFloat(this.indicadores.tceaEmisor.toFixed(5));
        this.indicadores.tceaEmisorEscudo = parseFloat(this.indicadores.tceaEmisorEscudo.toFixed(5));
        this.indicadores.treaBonista = parseFloat(this.indicadores.treaBonista.toFixed(5));
    }
}
