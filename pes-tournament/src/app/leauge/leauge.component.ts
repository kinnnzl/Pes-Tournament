import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-leauge',
  templateUrl: './leauge.component.html',
  styleUrls: ['./leauge.component.css']
})
export class LeaugeComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns: string[] = ['position', 'name', 'nation', 'teams', 'edit', 'delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentSettingLeauge);

    dialogRef.afterClosed().subscribe(result => {
      // Action reload team
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

@Component({
  selector: '../Utilities/dialog/dialog-content-setting-leauge',
  templateUrl: '../Utilities/dialog/dialog-content-setting-leauge.html',
})
export class DialogContentSettingLeauge {
  constructor(public dialogRef: MatDialogRef<DialogContentSettingLeauge>) { }

  msg = "";
  urlImgLogo: any;

  onSaveTeam(): void {
    this.dialogRef.close();
  }

  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.urlImgLogo = reader.result; 
		}
	}
}

export interface PeriodicElement {
  name: string;
  position: number;
  nation: string;
  teams: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Premier League', nation: 'England', teams: 2 },
  {position: 2, name: 'Laliga', nation: 'Spain', teams: 1 }
];
