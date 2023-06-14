import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@NgModule( {
    imports: [
        CommonModule,
        MatMenuModule,
        MatTabsModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule
    ],
    exports: [
        MatIconModule,
        MatMenuModule,
        MatTabsModule,
        MatToolbarModule,
        MatButtonModule
    ],
    providers: [
        MatDatepickerModule,
    ]
} )
export class MaterialModule {}