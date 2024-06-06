import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialPacienteComponentComponent } from './historial-paciente-component.component';

describe('HistorialPacienteComponentComponent', () => {
  let component: HistorialPacienteComponentComponent;
  let fixture: ComponentFixture<HistorialPacienteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialPacienteComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialPacienteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
