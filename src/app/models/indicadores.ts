import { IteracionCaja } from './iteracionCaja';

export class Indicadores {
    frecuenciaCupon: number;
    diasCapitalizacion: number;
    periodosAnio: number;
    totalPeriodos: number;
    tasaEfectivaAnual: number;
    tasaEfectiva: { value: number; type: string };
    cok: { value: number; type: string };
    costesInicialesEmisor: number;
    costesInicialesBonista: number;
    precioActual: number;
    utilidadPerdida: number;
    duracion: number;
    convexidad: number;
    total: number;
    duracionModificada: number;
    tceaEmisor: { actual: number; real: number };
    tceaEmisorEscudo: { actual: number; real: number };
    treaBonista: { actual: number; real: number };
    flujoCaja: IteracionCaja[];
    constructor() {
        this.frecuenciaCupon = 0;
        this.diasCapitalizacion = 0;
        this.periodosAnio = 0;
        this.totalPeriodos = 0;
        this.tasaEfectivaAnual = 0;
        this.tasaEfectiva = { value: 0, type: '' };
        this.cok = { value: 0, type: '' };
        this.costesInicialesEmisor = 0;
        this.costesInicialesBonista = 0;
        this.precioActual = 0;
        this.utilidadPerdida = 0;
        this.duracion = 0;
        this.convexidad = 0;
        this.total = 0;
        this.duracionModificada = 0;
        this.tceaEmisor = { actual: 0, real: 0 };
        this.tceaEmisorEscudo = { actual: 0, real: 0 };
        this.treaBonista = { actual: 0, real: 0 };
        this.flujoCaja = [];
    }
}
