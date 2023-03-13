import { Component, HostBinding } from '@angular/core';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
// import { CustomFilterOperations } from 'devextreme/data/custom_store';
import { ViewChild, OnInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { trips } from "../trips";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(DxDataGridComponent, { static: false }) dataGrid: DxDataGridComponent;

  dataSource: any[] = trips;
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  filterValue: Array<any>;
  customOperations: Array<any>;

  popupPosition: any;

  saleAmountHeaderFilter: any;

  constructor(private authService: AuthService,
              private screen: ScreenService,
              public appInfo: AppInfoService) {
    this.popupPosition = {
      of: window, at: 'top', my: 'top', offset: { y: 10 },
    };

  }

  ngOnInit() {
    this.dataGrid.instance.showColumnChooser();
  }



  onRowClick(e: any) {
    let keys = e.component.getSelectedRowKeys();
    let index = keys.indexOf(e.key);

    if (index > -1) {
      keys.splice(index, 1);
    } else {
      keys.push(e.key);
    }

    e.component.selectRows(keys);
  }

}
