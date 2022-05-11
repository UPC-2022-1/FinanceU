import { IteracionCaja } from './iteracionCaja';

export class Indicadores {
    frecuenciaCupon: number;
    diasCapitalizacion: number;
    periodosAnio: number;
    totalPeriodos: number;
    tasaEfectivaAnual: number;
    tasaEfectiva: number;
    cok: number;
    costesInicialesEmisor: number;
    costesInicialesBonista: number;
    precioActual: number;
    utilidadPerdida: number;
    duracion: number;
    convexidad: number;
    total: number;
    duracionModificada: number;
    tceaEmisor: number;
    tceaEmisorEscudo: number;
    treaBonista: number;
    flujoCaja: IteracionCaja[];
    constructor() {
        this.frecuenciaCupon = 0;
        this.diasCapitalizacion = 0;
        this.periodosAnio = 0;
        this.totalPeriodos = 0;
        this.tasaEfectivaAnual = 0;
        this.tasaEfectiva = 0;
        this.cok = 0;
        this.costesInicialesEmisor = 0;
        this.costesInicialesBonista = 0;
        this.precioActual = 0;
        this.utilidadPerdida = 0;
        this.duracion = 0;
        this.convexidad = 0;
        this.total = 0;
        this.duracionModificada = 0;
        this.tceaEmisor = 0;
        this.tceaEmisorEscudo = 0;
        this.treaBonista = 0;
        this.flujoCaja = [];
    }
}
