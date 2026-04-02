import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeEdicaoComponente } from './atividades-edicao';

describe('AtividadeEdicaoComponente', () => {
  let component: AtividadeEdicaoComponente;
  let fixture: ComponentFixture<AtividadeEdicaoComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeEdicaoComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeEdicaoComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
