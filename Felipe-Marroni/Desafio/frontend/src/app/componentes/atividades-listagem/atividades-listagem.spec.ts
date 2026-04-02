import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadeListagemComponente } from './atividades-listagem';

describe('AtividadeListagemComponente', () => {
  let component: AtividadeListagemComponente;
  let fixture: ComponentFixture<AtividadeListagemComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtividadeListagemComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(AtividadeListagemComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
