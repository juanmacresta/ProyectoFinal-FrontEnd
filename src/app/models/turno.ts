export class Turno {
  _id?: string;
  dia: string;
  hsDesde: number;
  paciente: string;
  professional: string;
  obraSocial: string;
  practica: string;
  costo?: number;
  pagado?: boolean;
  observacion?: string;


  constructor(dia: string, hsDesde: number, paciente: string, professional: string, obraSocial: string, practica: string, costo: number, pagado: boolean, observacion: string) {
    this.dia = dia;
    this.hsDesde = hsDesde;
    this.paciente = paciente;
    this.professional = professional;
    this.obraSocial = obraSocial;
    this.practica = practica;
    this.costo = costo;
    this.pagado = pagado;
    this.observacion = observacion;
    
  }

}
