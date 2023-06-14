import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeagueComponent, DialogContentSettingLeauge } from './league.component'
import { LeagueRoutingModule } from './league-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatChipsModule } from '@angular/material/chips'
import { MatSelectModule } from '@angular/material/select'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LeagueComponent, DialogContentSettingLeauge],
  imports: [
    CommonModule,
    LeagueRoutingModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    FormsModule
  ],
  exports : [
    MatChipsModule,
    FormsModule
  ],
  providers: [
     {
       provide: MatDialogActions,
       useValue: {}
     }
  ]
})
export class LeagueModule { }
