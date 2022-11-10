import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

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
  public menus = [
    {
      name: 'home',
      index: '1'
    }
  ];

  test() {
    this.appService.getTest().subscribe((data: []) => {
      var sdata = data
      console.log(sdata);
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
