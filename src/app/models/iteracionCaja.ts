export class IteracionCaja {
    fechaProgramada: Date;
    inflacionAnual: number;
    inflacion: { value: number; type: string };
    plazoGracia: string;
    bono: number;
    bonoIndexado: number;
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
    constructor(
        interacionCaja?: IteracionCaja
    ) {
        this.fechaProgramada = interacionCaja.fechaProgramada;
        this.inflacionAnual = interacionCaja.inflacionAnual;
        this.inflacion = interacionCaja.inflacion;
        this.plazoGracia = interacionCaja.plazoGracia;
        this.bono = interacionCaja.bono;
        this.bonoIndexado = interacionCaja.bonoIndexado;
        this.cuponInteres = interacionCaja.cuponInteres;
        this.cuota = interacionCaja.cuota;
        this.amortizacion = interacionCaja.amortizacion;
        this.prima = interacionCaja.prima;
        this.escudo = interacionCaja.escudo;
        this.flujoEmisor = interacionCaja.flujoEmisor;
        this.flujoEmisorEscudo = interacionCaja.flujoEmisorEscudo;
        this.flujoBonista = interacionCaja.flujoBonista;
        this.flujoAct = interacionCaja.flujoAct;
        this.faXPlazo = interacionCaja.faXPlazo;
        this.factorConvexidad = interacionCaja.factorConvexidad;
    }
}
