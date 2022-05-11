export class IteracionCaja {
    fechaProgramada: Date;
    inflacionAnual: number;
    inflacion: { value: number; type: string };
    plazoGracia: string;
    bono: number;
    cuponInteres: number;
    cuota: number;
    amortizacion: number;
    prima: number;
    escudo: number;
    flujoEmisor: number;
    flujoEmisorEscudo: number;
    flujoBonista: number;
    flujoAct: number;
    faXPlazo: number;
    factorConvexidad: number;
    constructor() {
        this.fechaProgramada = new Date();
        this.inflacionAnual = 0;
        this.inflacion = { value: 0, type: '' };
        this.plazoGracia = 'S';
        this.bono = 0;
        this.cuponInteres = 0;
        this.cuota = 0;
        this.amortizacion = 0;
        this.prima = 0;
        this.escudo = 0;
        this.flujoEmisor = 0;
        this.flujoEmisorEscudo = 0;
        this.flujoBonista = 0;
        this.flujoAct = 0;
        this.faXPlazo = 0;
        this.factorConvexidad = 0;
    }
}
