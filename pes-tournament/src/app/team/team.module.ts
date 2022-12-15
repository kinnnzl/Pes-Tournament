import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentExampleDialog, TeamComponent } from './team.component'
import { TeamRoutingModule } from './team-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';


@NgModule({
  declarations: [TeamComponent, DialogContentExampleDialog],
  imports: [
    CommonModule,
    TeamRoutingModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [
     {
       provide: MatDialogActions,
       useValue: {}
     }
  ]
})
export class TeamModule { }
