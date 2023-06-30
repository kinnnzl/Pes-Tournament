import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UtillitiesService } from '../Utilities/service/utillities.service';
import { LeagueService } from './service/league.service';
import * as $ from "jquery";
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit, AfterViewInit {

  constructor(public dialog: MatDialog
    , private leagueService: LeagueService
    , private toastService: HotToastService) { }

  displayedColumns: string[] = ['No', 'Logo', 'LeagueName', 'Country', 'Teams', 'edit', 'delete'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues() {
    this.leagueService.getLeagues(null).subscribe((data: []) => {
      this.dataSource.data = data;
    });
  }

  openDialog(isEdit: boolean, leagueId: number) {
    const dialogRef = this.dialog.open(DialogContentSettingLeauge, {
      data: { EditMode: isEdit, LeagueID: leagueId },
    });

    dialogRef.afterClosed().subscribe(result => {
      // Action reload team
      this.toastService.success('Saved success!')
      this.getLeagues();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showToast() {
    this.toastService.success('Successfully toasted!');
  }

}

@Component({
  selector: '../Utilities/dialog/league/dialog-content-setting-league',
  templateUrl: '../Utilities/dialog/league/dialog-content-setting-league.html',
})
export class DialogContentSettingLeauge implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogContentSettingLeauge>
    , private utillitiesService: UtillitiesService
    , private toastService: HotToastService
    , private leagueService: LeagueService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  public msg = "";
  public urlImgLogo: any;
  public listCountry: any[] = [];
  public objLeague = {
    LeagueName: null as any,
    CountryID: 0 as any,
    Country: null as any,
    LogoName: null as any,
    LogoType: null as any,
    LogoBase64: null as any
  }

  ngOnInit(): void {
    this.utillitiesService.getCountrys().subscribe((data: []) => {
      this.listCountry = data;
    });
    if (this.data.EditMode) {
      this.leagueService.getLeagues(this.data.LeagueID).subscribe((result: any[]) => {
        if (result.length != 0) {
          this.objLeague = $.extend(this.objLeague, result[0]);
          this.objLeague.CountryID = result[0].CountryID.toString();
          this.urlImgLogo = result[0].LogoBase64;
        }
      });
    }
  }

  onSaveLeauge(): void {
    this.objLeague.CountryID = Number(this.objLeague.CountryID);
    if (this.data.EditMode) {
      this.leagueService.updateLeague(this.objLeague).subscribe((data: []) => {
        // this.listCountry = data;
        this.dialogRef.close();
      });
    }
    else {
      this.leagueService.createLeague(this.objLeague).subscribe((data: []) => {
        // this.listCountry = data;
        this.dialogRef.close();
      });
    }
  }

  onChangeCountry() {
    this.objLeague.Country = this.listCountry.find(x => x.CountryID == this.objLeague.CountryID)?.CountryName;
  }

  selectFile(event: any) { //Angular 11, for stricter type
    if (!event.target.files[0] || event.target.files[0].length == 0) {
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
      this.objLeague.LogoBase64 = this.urlImgLogo;
      this.objLeague.LogoName = event.target.files[0].name;
      this.objLeague.LogoType = event.target.files[0].type;
    }
  }
}
