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
import { FuseAlertService, FuseAlertType } from '@fuse/components/alert';
import { Bono } from 'app/models/bono';
import { Indicadores } from 'app/models/indicadores';
import { IteracionCaja } from 'app/models/iteracionCaja';
import { BonoService } from 'app/services/bono.service';
import { irr } from 'financial';
import { FuseAlertModule } from '@fuse/components/alert';

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

    public bono: Bono;
    public indicadores: Indicadores = new Indicadores();
    public bonoDataForm: FormGroup;
    public indicadoresDataForm: FormGroup;

    public loading: boolean = false;

    panelBonista = true;
    panelIndicadores = true;
    panelCajaFlujo = true;

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
        private _formBuilder: FormBuilder,
        private _fuseAlertService: FuseAlertService
    ) {
        this.loading = true;

        this.bono = JSON.parse(localStorage.getItem('bono'));
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
            flujoCaja: [this.indicadores.flujoCaja]
        });
    }
    ngOnDestroy(): void { }
    ngOnChanges(): void { }
    ngOnInit(): void {
        this._fuseAlertService.dismiss('alertBox');
        // Create the form

        this.bonoDataForm.valueChanges.subscribe((val) => {
            this.bonoDataForm.patchValue(val, { emitEvent: false });
            this.compute();
        });

        this.indicadoresDataForm.valueChanges.subscribe((val) => {
            this.indicadoresDataForm.patchValue(val, { emitEvent: false });
        });

        this.loading = false;
    }

    compute(): void {
        this.bono = this.bonoDataForm.value;
        this.calculate();
        this.indicadoresDataForm.setValue(this.indicadores);
    }

    calculate(): void {
        try {
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
            this._fuseAlertService.show('alertBox');
        }
        try {
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
            this._fuseAlertService.show('alertBox');
        }
        try {
            this.indicadores.periodosAnio =
                this.bono.diasXAnio / this.indicadores.frecuenciaCupon;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }
        try {
            this.indicadores.totalPeriodos =
                this.indicadores.periodosAnio * this.bono.numeroAnios;
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }
        try {
            switch (this.bono.tipoTasaInteres) {
                case 'EFECTIVA':
                    this.indicadores.tasaEfectivaAnual = this.bono.tasaInteres;
                    break;
                case 'NOMINAL':
                    const temp = this.bono.diasXAnio / this.indicadores.diasCapitalizacion;
                    const i = this.bono.tasaInteres / 100;
                    this.indicadores.tasaEfectivaAnual = (1 + i / temp) ** (temp) - 1;
                    this.indicadores.tasaEfectivaAnual *= 100;
                    break;
            }
        } catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
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
            this._fuseAlertService.show('alertBox');
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
            this._fuseAlertService.show('alertBox');
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
            this._fuseAlertService.show('alertBox');
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
            this._fuseAlertService.show('alertBox');
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
            this._fuseAlertService.show('alertBox');
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
                    flujoBonista: - this.bono.valorComercial - this.indicadores.costesInicialesBonista,
                    flujoAct: null,
                    faXPlazo: null,
                    factorConvexidad: null,
                }));
            for (let i = 1; i < this.indicadores.totalPeriodos + 1; i++) {
                const fechaEmision = new Date(this.bono.fechaEmision);
                const flujoActual = new IteracionCaja({
                    fechaProgramada: new Date(fechaEmision.getTime() + (i * this.indicadores.frecuenciaCupon * 24 * 60 * 60 * 1000)),
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
                    flujoEmisor: null,
                    flujoEmisorEscudo: null,
                    flujoBonista: null,
                    flujoAct: null,
                    faXPlazo: null,
                    factorConvexidad: null,
                });

                flujoActual.bonoIndexado = flujoActual.bono * (1 + flujoActual.inflacion.value);
                flujoActual.cuponInteres = - flujoActual.bonoIndexado * this.indicadores.tasaEfectiva / 100;
                flujoActual.escudo = - flujoActual.cuponInteres * this.bono.impuestoRenta / 100;

                switch (this.bono.tipoBono) {
                    case 'AMERICANO':
                        flujoActual.amortizacion = i === this.indicadores.totalPeriodos ? - flujoActual.bonoIndexado : 0;
                        flujoActual.cuota = flujoActual.plazoGracia === 'T' ? 0 : flujoActual.cuponInteres + flujoActual.amortizacion;
                        flujoActual.prima = i === this.indicadores.totalPeriodos ? - this.bono.valorNominal * this.bono.prima / 100 : 0;
                        break;
                    case 'ALEMAN':
                        flujoActual.amortizacion = flujoActual.plazoGracia === 'T' || flujoActual.plazoGracia === 'P' ?
                            0 : - flujoActual.bonoIndexado / (this.indicadores.totalPeriodos - i + 1);
                        flujoActual.cuota = flujoActual.plazoGracia === 'T' ? 0 :
                            flujoActual.plazoGracia === 'P' ? flujoActual.cuponInteres : flujoActual.cuponInteres + flujoActual.amortizacion;
                        flujoActual.prima = i === this.indicadores.totalPeriodos ? - flujoActual.bonoIndexado * this.bono.prima / 100 : 0;
                        break;
                    case 'FRANCES':
                        const PV = flujoActual.bonoIndexado;
                        const rate = this.indicadores.tasaEfectiva / 100;
                        const nper = this.indicadores.totalPeriodos - i + 1;
                        flujoActual.cuota = flujoActual.plazoGracia === 'T' ? 0 :
                            flujoActual.plazoGracia === 'P' ? 0 : - (PV * rate) / (1 - (1 + rate) ** -nper);
                        flujoActual.amortizacion = flujoActual.plazoGracia === 'T' || flujoActual.plazoGracia === 'P' ?
                            0 : flujoActual.cuota - flujoActual.cuponInteres;
                        flujoActual.prima = i === this.indicadores.totalPeriodos ? - flujoActual.bonoIndexado * this.bono.prima / 100 : 0;
                        break;
                }

                flujoActual.flujoEmisor = flujoActual.cuota + flujoActual.prima;
                flujoActual.flujoEmisorEscudo = flujoActual.flujoEmisor + flujoActual.escudo;
                flujoActual.flujoBonista = - flujoActual.flujoEmisor;
                flujoActual.flujoAct = flujoActual.flujoBonista / ((1 + this.indicadores.cok / 100) ** i);
                flujoActual.faXPlazo = flujoActual.flujoAct * i * this.indicadores.frecuenciaCupon / this.bono.diasXAnio;
                flujoActual.factorConvexidad = flujoActual.flujoAct * i * (1 + i);

                this.indicadores.flujoCaja.push(flujoActual);
            }
        }
        catch (error) {
            console.log(this.bono);
            console.log(this.indicadores);
            console.log(error);
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }


        try {
            for (let i = 1; i < this.indicadores.totalPeriodos + 1; i++) {
                this.indicadores.precioActual += this.indicadores.flujoCaja[i].flujoBonista / ((1 + this.indicadores.cok / 100) ** i);
            }
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }


        try {
            this.indicadores.utilidadPerdida = this.indicadores.flujoCaja[0].flujoBonista + this.indicadores.precioActual;
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            let acomFlujoAct: number = 0;
            let acomFaxPlazo: number = 0;
            for (let i = 1; i < this.indicadores.totalPeriodos + 1; i++) {
                acomFlujoAct += this.indicadores.flujoCaja[i].flujoAct;
                acomFaxPlazo += this.indicadores.flujoCaja[i].faXPlazo;
            }
            this.indicadores.duracion = acomFaxPlazo / acomFlujoAct;
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            let acomFlujoAct: number = 0;
            let acomFactConvex: number = 0;
            for (let i = 1; i < this.indicadores.totalPeriodos + 1; i++) {
                acomFlujoAct += this.indicadores.flujoCaja[i].flujoAct;
                acomFactConvex += this.indicadores.flujoCaja[i].factorConvexidad;
            }
            const temp = this.bono.diasXAnio / this.indicadores.frecuenciaCupon;
            this.indicadores.convexidad = acomFactConvex / (((1 + this.indicadores.cok / 100) ** 2) * acomFlujoAct * (temp ** 2));
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            this.indicadores.total = this.indicadores.duracion + this.indicadores.convexidad;
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            this.indicadores.duracionModificada = this.indicadores.duracion / (1 + this.indicadores.cok / 100);
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            const IRR = irr(this.indicadores.flujoCaja.map(x => x.flujoEmisor));
            this.indicadores.tceaEmisor = ((IRR + 1) ** (this.bono.diasXAnio / this.indicadores.frecuenciaCupon) - 1) * 100;
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            const IRR = irr(this.indicadores.flujoCaja.map(x => x.flujoEmisorEscudo));
            this.indicadores.tceaEmisorEscudo = ((IRR + 1) ** (this.bono.diasXAnio / this.indicadores.frecuenciaCupon) - 1) * 100;
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
        }

        try {
            const IRR = irr(this.indicadores.flujoCaja.map(x => x.flujoBonista));
            this.indicadores.treaBonista = ((IRR + 1) ** (this.bono.diasXAnio / this.indicadores.frecuenciaCupon) - 1) * 100;
        }
        catch (error) {
            this.alert = {
                type: 'error',
                message: error.message,
            };
            this._fuseAlertService.show('alertBox');
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

    save(): void {
        this.loading = true;
        this.bonoDataForm.disable();
        this._bonoService.saveBono(this.bono).subscribe(() => {
            this.alert = {
                type: 'success',
                message: 'Guardado correctamente',
            };
            this._fuseAlertService.show('alertBox');
            this.bonoDataForm.enable();
            this.loading = false;
        },
            () => {
                document.getElementsByTagName('html')[0].getAttribute('lang');
                this.alert = {
                    type: 'error',
                    message: 'Error en el servidor',
                };
                this._fuseAlertService.show('alertBox');
                this.loading = false;
            });

    }
}
