import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurnoService } from '../../../../services/turno.service';
import {Turno} from "../../../../models/turno";
import {ProfessionalService} from "../../../../services/professional.service";
import {PacienteService} from "../../../../services/paciente.service";
import {ObraSocialService} from "../../../../services/obra-social.service";
import {PracticeService} from "../../../../services/practice.service";

@Component({
  selector: 'app-list-turnos',
  templateUrl: './list-turnos.component.html',
  styleUrls: ['./list-turnos.component.css']
})
export class ListTurnosComponent implements OnInit {
  turnos: Turno[] = [];
  turnosDetallados: any[] = [];

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
      this.turnoService.getTurnosByProf(id).subscribe(turnos => {
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
            });
          });
        });
      });
    });
  }

}
