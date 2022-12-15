import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';


@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: '../Utilities/dialog/dialog-content-example-dialog',
  templateUrl: '../Utilities/dialog/dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(public dialog: MatDialog, public dialogAction: MatDialogActions) { }
}