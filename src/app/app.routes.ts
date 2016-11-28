import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about';
import { SearchComponent } from './search';
import { ResultsComponent } from './results';
import { QuestionComponent } from './question';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: SearchComponent },
  { path: 'search', component: SearchComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'results/:id', component: QuestionComponent },
  { path: '**',    component: NoContentComponent },
];
