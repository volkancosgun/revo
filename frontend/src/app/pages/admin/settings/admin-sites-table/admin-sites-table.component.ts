import { Component, OnInit } from '@angular/core';
import icAdd from '@iconify/icons-ic/twotone-add';

@Component({
  selector: 'vex-admin-sites-table',
  templateUrl: './admin-sites-table.component.html',
  styleUrls: ['./admin-sites-table.component.scss']
})
export class AdminSitesTableComponent implements OnInit {
  icAdd = icAdd;
  constructor() { }

  ngOnInit() {
  }

}
