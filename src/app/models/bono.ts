export  class Bono{

    public moneda: string;
    public valorNominal: number;
    public valorComercial: number;
    public numeroAnios: number;
    public frecuenciaCupon: string;
    public diasXAnio: number;
    public tipoTasaInteres: string;
    public capitalizacion: string;
    public tasaInteres: number;
    public tasaAnualDescuento: number;
    public impuestoRenta: number;
    public fechaEmision: Date;
    public prima: number;
    public estructuracion: number;
    public colocacion: number;
    public flotacion: number;
    public cavali: number;
    public tipoBono: string;

    constructor(){
        this.moneda = 'USD';
        this.valorNominal = 1000;
        this.valorComercial = 1050;
        this.numeroAnios = 5;
        this.frecuenciaCupon = 'SEMESTRAL';
        this.diasXAnio = 360;
        this.tipoTasaInteres = 'EFECTIVA';
        this.capitalizacion = 'BIMESTRAL';
        this.tasaInteres = 8;
        this.tasaAnualDescuento = 4.5;
        this.impuestoRenta = 30;
        this.fechaEmision = new Date();
        this.prima = 1;
        this.estructuracion = 1;
        this.colocacion = 0.25;
        this.flotacion = 0.45;
        this.cavali = 0.5;
        this.tipoBono = 'AMERICANO';
    }
}
