import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from '../../../services/turno.service';
import {Turno} from "../../../models/turno";
import {ProfessionalService} from "../../../services/professional.service";
import {PacienteService} from "../../../services/paciente.service";
import {ObraSocialService} from "../../../services/obra-social.service";
import {PracticeService} from "../../../services/practice.service";
import * as moment from "moment";

@Component({
  selector: 'app-historial-paciente-component',
  templateUrl: './historial-paciente-component.component.html',
  styleUrls: ['./historial-paciente-component.component.css']
})
export class HistorialPacienteComponentComponent implements OnInit {
  turnos: Turno[] = [];
  turnosDetallados: any[] = [];
  filteredTurnos: any[] = [];
  filterDate: string = '';

  constructor(
    private turnoService: TurnoService,
    private pacienteService: PacienteService,
    private professionalService: ProfessionalService,
    private obraSocialService: ObraSocialService,
    private practiceService: PracticeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.turnoService.getTurnosByPaciente(id).subscribe(turnos => {
        this.turnos = turnos;
        this.cargarDetallesTurnos();
      });
    }
  }

  cargarDetallesTurnos(): void {
    this.turnos.forEach(turno => {
      const detalleTurno: any = { ...turno };

      // Obtener detalles del paciente
      this.pacienteService.obtenerPaciente(turno.paciente).subscribe(paciente => {
        detalleTurno.pacienteNombre = paciente.nombre;
        detalleTurno.pacienteApellido = paciente.apellido;

        // Obtener detalles del profesional
        this.professionalService.getProfessional(turno.professional).subscribe(profesional => {
          detalleTurno.professionalNombre = profesional.nombre;
          detalleTurno.professionalApellido = profesional.apellido;

          // Obtener detalles de la obra social
          this.obraSocialService.getOS(turno.obraSocial).subscribe(obraSocial => {
            detalleTurno.obraSocialNombre = obraSocial.nombre;

            // Obtener detalles de la práctica
            this.practiceService.getPractice(turno.practica).subscribe(practica => {
              detalleTurno.practicaNombre = practica.nombre;

              this.turnosDetallados.push(detalleTurno);

              // Actualizar la lista de turnos filtrados
              this.filteredTurnos = [...this.turnosDetallados];
            });
          });
        });
      });
    });
  }

  applyFilter(): void {
    if (this.filterDate) {
      const selectedDate = moment(this.filterDate).startOf('day');
      this.filteredTurnos = this.turnosDetallados.filter(turno => {
        const turnoDate = moment(turno.dia).startOf('day');
        return selectedDate.isSame(turnoDate);
      });
    } else {
      this.filteredTurnos = [...this.turnosDetallados];
    }
  }
  
  decimalAHora(hs: number) {
    let horas = Math.floor(hs), // Obtenemos la parte entera
      restoHoras = Math.floor(hs % 1 * 100), // Obtenemos la parde decimal
      decimalMinutos = restoHoras * 60 / 100, // Obtenemos los minutos expresado en decimal
      minutos = Math.floor(decimalMinutos), // Obtenemos la parte entera
      restoMins = Math.floor(decimalMinutos % 1 * 100), // Obtenemos la parde decimal
      segundos = Math.floor(restoMins * 60 / 100); // Obtenemos los segundos expresado en entero
    return (`${('00' + horas).slice(-2)}:${('00' + minutos).slice(-2)}`);
  }

}
