import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeCriacaoComponente } from './atividades-criacao';

describe('AtividadeCriacaoComponente', () => {
  let component: AtividadeCriacaoComponente;
  let fixture: ComponentFixture<AtividadeCriacaoComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeCriacaoComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeCriacaoComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
