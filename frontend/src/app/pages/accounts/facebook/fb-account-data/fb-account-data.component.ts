import { Component, OnInit, OnChanges, AfterViewInit, SimpleChanges, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FbAccount } from 'src/app/pages/accounts/_models/fb-account';
import { FbTableMenu } from 'src/app/pages/accounts/_models/fb-table-menu';

import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icMove from '@iconify/icons-ic/twotone-move-to-inbox';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import { SelectionModel } from '@angular/cdk/collections';
import { AccCats } from 'src/environments/acc-cats';

@Component({
  selector: 'vex-fb-account-data',
  templateUrl: './fb-account-data.component.html',
  styleUrls: ['./fb-account-data.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ],
  animations: [
    stagger20ms,
    fadeInUp400ms,
    scaleFadeIn400ms
  ]
})
export class FbAccountDataComponent<T> implements OnInit, OnChanges, AfterViewInit {

  @Input() data: T[];
  @Input() columns: TableColumn<T>[];
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 20, 50, 100, 200, 500];
  @Input() searchStr: string;
  @Input() categoryData: any;

  @Output() toggleStar = new EventEmitter<FbAccount['id']>();
  @Output() openAccount = new EventEmitter<FbAccount['id']>();
  @Output() deleteAccount = new EventEmitter<FbAccount['id']>();
  @Output() deleteAccounts = new EventEmitter<T[]>();
  @Output() moveAccounts = new EventEmitter<T[]>();

  visibleColumns: Array<keyof T | string>;
  dataSource = new MatTableDataSource<T>();
  selection = new SelectionModel<T>(true, []);
  accCats: FbTableMenu[] = AccCats;
  category: FbTableMenu;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  icMoreVert = icMoreVert;
  icStar = icStar;
  icStarBorder = icStarBorder;
  icDeleteForever = icDeleteForever;
  icEdit = icEdit;
  icMove = icMove;

  constructor() { }

  ngOnInit() {
    this.category = this.accCats[this.categoryData - 1];
  }

  categoryChanged(cat: any) {
    console.log(cat);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.columns) {
      this.visibleColumns = this.columns.map(column => column.property);
    }

    if (changes.data) {
      this.dataSource.data = this.data;
    }

    if (changes.searchStr) {
      this.dataSource.filter = (this.searchStr || '').trim().toLowerCase();
    }

    this.selection.clear();

  }

  emitToggleStar(event: Event, id: FbAccount['id']) {
    event.stopPropagation();
    this.toggleStar.emit(id);
  }

  delAccounts() {
    this.deleteAccounts.emit(this.selection.selected);
  }

  movAccounts() {
    this.moveAccounts.emit(this.selection.selected);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
