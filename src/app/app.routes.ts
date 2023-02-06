import { VoteComponent } from './components/vote/vote.component';
import { CustomRoutes } from './constants';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';

export const AppRoutes: Routes = [
  {
    path: '', component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: CustomRoutes.create, component: CreateComponent,
    pathMatch: 'full'
  },
  {
    path: CustomRoutes.vote, component: VoteComponent,
    pathMatch: 'full'
  },
  {
    path: '**', component: MainPageComponent,
    pathMatch: 'full'    
  },
];
