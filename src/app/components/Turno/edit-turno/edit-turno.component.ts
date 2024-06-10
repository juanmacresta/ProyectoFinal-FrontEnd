import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-edit-turno',
  templateUrl: './edit-turno.component.html',
  styleUrls: ['./edit-turno.component.css']
})
export class EditTurnoComponent implements OnInit {
  editTurnoForm: FormGroup;
  turnoId: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private turnoService: TurnoService
  ) {
    this.editTurnoForm = this.fb.group({
      costo: ['', Validators.required],
      pagado: ['', Validators.required],
      observacion: ['']
    });

    this.turnoId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.loadTurno();
  }

  loadTurno(): void {
    this.turnoService.getTurno(this.turnoId).subscribe(turno => {
      this.editTurnoForm.patchValue({
        costo: turno.costo,
        pagado: turno.pagado,
        observacion: turno.observacion
      });
    });
  }

  onSubmit(): void {
    if (this.editTurnoForm.valid) {
      this.turnoService.updateTurno(this.turnoId, this.editTurnoForm.value).subscribe(() => {
        this.router.navigate(['/turnos']);
      });
    }
  }
}