import { Routes } from '@angular/router';
import { AtividadeListagemComponente } from './componentes/atividades-listagem/atividades-listagem';
import { AtividadeCriacaoComponente } from './componentes/atividades-criacao/atividades-criacao';
import { AtividadeEdicaoComponente } from './componentes/atividades-edicao/atividades-edicao';

export const routes: Routes = [
  { path: '', component: AtividadeListagemComponente }, 
  { path: 'nova', component: AtividadeCriacaoComponente },
  { path: 'editar/:id', component: AtividadeEdicaoComponente },
];
