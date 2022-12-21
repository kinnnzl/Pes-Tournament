import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaugeComponent } from './leauge.component';

const routes: Routes = [{
  path: '',
  component: LeaugeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaugeRoutingModule { }
