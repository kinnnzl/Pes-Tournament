import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
  },
  {
    path: 'settings/team',
    loadChildren: () => import('./team/team.module').then(x => x.TeamModule)
  },
  {
    path: 'settings/league',
    loadChildren: () => import('./league/league.module').then(x => x.LeagueModule)
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(x => x.HomeModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
