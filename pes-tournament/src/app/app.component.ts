import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';
import * as ConstValue from './Utilities/app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private appService: AppService,
    private router: Router) {}

  public indexTabMenu = 0;
  public listMenu: any[] = [];
  public listMenuItem: any[] = [];
  public listSettingMenu: any[] = [];

  ngOnInit() {
    this.getMenus();
  }  

  getMenus() {
    this.appService.getMenus().subscribe((data: []) => {
      this.listMenu = data;
      if (this.listMenu.length != 0) {
        this.appService.getMenuItems().subscribe((data: []) => {
          this.listMenuItem = data;
          if (this.listMenuItem.length != 0) this.listSettingMenu = this.listMenuItem.filter(x => x.Module === ConstValue.MODULE_SETTING);
        });
      }
    });
  }

  // GetSelectedTabMenuIndex(): string {
  //   // console.log(this.router.url);
  //   // let index = '0'
  //   // var spliteUrl = this.router.url.split('/');
  //   // if (spliteUrl.length != 0) index = this.menus.filter(x => x.name)
  //   // return '1';
  // }

  setIndexTabMenu(index: any) {
    this.indexTabMenu = index;
  }
}
