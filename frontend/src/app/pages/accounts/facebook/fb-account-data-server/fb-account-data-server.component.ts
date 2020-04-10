import { Component, OnInit, Input, ViewChild, ElementRef, SimpleChanges, OnChanges, Output } from '@angular/core';
import { AccountDataSource } from '../../_models/data-sources/account.datasource';
import { AccountModel } from '../../_models/account.model';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { MatPaginator, MatSort, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatDialog, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AccountsService } from '../../_services/accounts.service';
import { merge, fromEvent } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { TableParamsModel } from 'src/app/_models/table/models/table-params.model';
import { stagger20ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleFadeIn400ms } from 'src/@vex/animations/scale-fade-in.animation';

import icStar from '@iconify/icons-ic/twotone-star';
import icStarBorder from '@iconify/icons-ic/twotone-star-border';
import icMoreVert from '@iconify/icons-ic/twotone-more-vert';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icMove from '@iconify/icons-ic/twotone-move-to-inbox';
import icDeleteForever from '@iconify/icons-ic/twotone-delete-forever';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icFilterCountry from '@iconify/icons-ic/twotone-find-in-page';
import icRefresh from '@iconify/icons-ic/twotone-refresh';

import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { FbTableMenu } from '../../_models/fb-table-menu';
import { AccCats } from 'src/environments/acc-cats';
import { EventEmitter } from 'protractor';
import { FbAccount } from '../../_models/fb-account';
import { FbAccountEditComponent } from '../fb-account-edit/fb-account-edit.component';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { FbAccountMoveComponent } from '../fb-account-move/fb-account-move.component';
import { ProgressDialogComponent } from 'src/app/shared/progress-dialog/progress-dialog.component';

import * as _ from 'lodash';
import { isArray } from 'util';

@Component({
  selector: 'vex-fb-account-data-server',
  templateUrl: './fb-account-data-server.component.html',
  styleUrls: ['./fb-account-data-server.component.scss'],
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
export class FbAccountDataServerComponent<AccountModel> implements OnInit, OnChanges {

  @Input() data: AccountModel[];
  @Input() columns: TableColumn<AccountModel>[];
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 20, 50, 100, 200, 500];
  @Input() searchStr: string;
  @Input() categoryData: any;
  @Input() userData: User;
  @Input() createAccount: boolean;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  dataSource: AccountDataSource;
  dataResult: FbAccount[] = [];

  displayedColumns: TableColumn<AccountModel>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'TARİH', property: 'created_at', type: 'text', visible: true },
    { label: 'LOGIN', property: 'uname', type: 'text', visible: true },
    { label: 'PASS', property: 'upass', type: 'text', visible: true },
    { label: 'ÜLKE', property: 'country', type: 'text', visible: true },
    { label: 'DİL', property: 'lang', type: 'text', visible: true },
    { label: 'NOT', property: 'unote', type: 'text', visible: true },
    { label: 'yok', property: 'starred', type: 'text', visible: true },
    { label: 'İşlemler', property: 'actions', type: 'button', visible: true }
    /* { label: 'Ad Soyad', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Email', property: 'mail', type: 'text', visible: false },
    { label: 'İşlemler', property: 'actions', type: 'button', visible: true } */
  ];

  //displayedColumns = ['checkbox', 'created_at', 'uname', 'upass', 'country', 'lang', 'unote', 'starred', 'actions'];
  //visibleColumns: Array<keyof FbAccount | string>;

  filterStatus: number = 0;
  selection = new SelectionModel<FbAccount>(true, []);
  category: FbTableMenu;
  accCats: FbTableMenu[] = AccCats;

  filterCountry: string = '';
  filterLanguage: string = '';

  icMoreVert = icMoreVert;
  icStar = icStar;
  icStarBorder = icStarBorder;
  icDeleteForever = icDeleteForever;
  icEdit = icEdit;
  icMove = icMove;
  icFilterList = icFilterList;
  icFilterCountry = icFilterCountry;
  icRefresh = icRefresh;

  constructor(
    private authService: AuthenticationService,
    private accService: AccountsService,
    private dialog: MatDialog,
    private bar: MatSnackBar
  ) { }

  get visibleColumns() {
    return this.displayedColumns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {

    this.category = this.accCats[this.categoryData - 1];

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(() => {
        this.loadData();
      })
    ).subscribe();

    this.dataSource = new AccountDataSource(this.accService);
    let tableParams = new TableParamsModel({});

    this.dataSource.loadAccounts(tableParams, this.categoryData, this.userData.unumber);
    this.dataSource.entitySubject.subscribe(res => (this.dataResult = res));


    setTimeout(() => {
      this.categoryTotals();
    }, 2000);


  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource) {

      if (changes.categoryData || changes.userData || changes.searchStr) {

        this.category = this.accCats[this.categoryData - 1];
        this.paginator.pageIndex = 0;
        this.filterCountry = '';
        this.loadData();

      }

      if (changes.createAccount) {
        this.openAccount();
      }

      this.selection.clear();
      this.categoryTotals();

    }


  }

  categoryTotals() {

    for (let i = 0; i < 9; i++) {
      this.accCats[i].count = 0;
    }

    this.accService.getTotals(this.userData.unumber).subscribe((res: any) => {

      res.forEach((value: any) => {
        this.accCats[value.category - 1].count = this.kFormatter(value.count);
      });

    });

  }

  kFormatter(number) {

    const SI_SYMBOL = ["", "K", "M", "G", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = Math.log10(number) / 3 | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
  }

  loadData() {

    const tableParams = new TableParamsModel(
      this.filterConfig(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );

    this.dataSource.loadAccounts(tableParams, this.categoryData, this.userData.unumber);


  }

  filterConfig(): any {
    const filter: any = {};
    const searchText: string = this.searchStr;

    if (this.filterCountry) {
      filter.country = this.filterCountry;
    }

    if (this.filterLanguage) {
      filter.lang = this.filterLanguage;
    }


    if (searchText) {
      filter.uname = searchText;
      filter.upass = searchText;
      filter.unote = searchText;
      filter.country = searchText;
      filter.lang = searchText;
    }

    return filter;
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataResult.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.selection.selected.length === this.dataResult.length) {
      this.selection.clear();
    } else {
      this.dataResult.forEach(row => this.selection.select(row));
    }
  }

  openAccount(acc?: FbAccount) {


    let account = acc || { id: null, category: null };

    this.dialog.open(FbAccountEditComponent, {
      data: { account_id: account.id || null, account_data: account, account_category: this.categoryData, account_user: this.userData },
      width: '100vw',
      height: '100vh',
      maxWidth: '100vw',
      maxHeight: '100vh',
      hasBackdrop: false,
      panelClass: 'custom-modalbox'
    }).afterClosed().subscribe((res: any) => {

      if (res && res.isUpdate === false) {

        this.loadData();

      } else {
        if (res && this.categoryData != account.category) {

          this.dataResult = this.dataResult.filter((value, key) => {
            return value.id != account.id;
          });

          this.dataSource.entitySubject.next(this.dataResult);
          this.dataSource.paginatorTotalSubject.next(this.dataResult.length);

        }
      }

    });
  }

  deleteAccount(account: FbAccount) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      //width: '340px',
      data: { title: 'İşlem onayı', msg: `<strong>${account.uname}</strong> adlı hesap silinecek! Onaylıyor musunuz?<br> <small class="text-secondary"><strong class="text-red-500">UYARI:</strong> Bu işlemi onaylamanız halinde hesap verisini kaybedeceğinizi unutmayın!</small>`, btnCancelText: 'Vazgeç', btnOkText: 'Onayla' }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        account.status = -1;

        this.accService.createUpdateAccount(account, true).subscribe(res => {

          this.removeItem(account.id);

        });

      }
    });

  }

  deleteAccounts() {
    let accounts = this.selection.selected;
    let _delIds = [];
    let _dialogTitle = `Toplu İşlem Onayı`;
    let _dialogMsg = `<p><strong class="text-red-500">Dikkat:</strong> Toplam <strong>${accounts.length} hesap silinecek onaylıyor musunuz?</strong></p>`;
    _dialogMsg += `<p><small class="text-secondary">İşlem yapılacak hesapların listesi aşağıda <strong>[id ,hesap]</strong> şeklinde listelenmiştir.</small></p>`;
    accounts.forEach(acc => {
      _dialogMsg += `<p>[${acc.id} - ${acc.uname}]</p>`;
      _delIds.push(acc.id);
    });

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '340px',
      data: {
        title: _dialogTitle,
        msg: _dialogMsg,
        btnCancelText: 'Vazgeç',
        btnOkText: `Evet ${accounts.length} hesabı sil`
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res) {

        const progressRef = this.dialog.open(ProgressDialogComponent, {
          width: '340px',
          disableClose: true,
          data: {
            msg: 'Silme işlemi başladı, lütfen kısa bir süre bekleyin...',
            closeTime: accounts.length
          }
        });

        setTimeout(() => {

          this.accService.deletingAccounts(_delIds).subscribe((res: any) => {

            if (!res.error) {

              _delIds.forEach(delAccId => {

                this.removeItem(delAccId);

              });

              this.selection.clear();

              this.bar.open('Silme işlemi başarıyla tamamlandı.', 'OK!', { duration: 5000 });

              progressRef.close();

              this.loadData();


            }


          }, err => {
            this.bar.open('Beklenmedik bir hata oluştu.', 'OK!', { duration: 5000 });
            progressRef.close();
          });

        }, 1000);
      }

    });



  }

  toggleStar(e, account: FbAccount) {
    e.stopPropagation();

    if (account) {
      account.starred = !account.starred;
      this.accService.changeStarredAccount(account.id, account.starred).subscribe(res => {
        console.log('fav eklendi');
      }, err => {
        account.starred = !account.starred;
      })
    }
  }

  moveAccounts() {

    let accounts = this.selection.selected;

    let _moveIds = [];
    let _dialogTitle = `Toplu Hesap Taşıma İşlemi`;
    let _dialogMsg = `<p><strong class="text-red-500">Dikkat:</strong> Toplam <strong>${accounts.length} hesap taşınacak.</strong></p>`;
    _dialogMsg += `<p><small class="text-secondary">İşlem yapılacak hesapların listesi aşağıda <strong>[id ,hesap]</strong> şeklinde listelenmiştir.</small></p>`;
    accounts.forEach(acc => {
      _dialogMsg += `<p>[${acc.id} - ${acc.uname}]</p>`;
      _moveIds.push(acc.id);
    });

    const dialogRef = this.dialog.open(FbAccountMoveComponent, {
      width: '480px',
      data: {
        moveAcc: accounts,
        account_user: this.userData,
        account_category: this.categoryData,
        title: _dialogTitle,
        msg: _dialogMsg,
        btnCancelText: 'Vazgeç',
        btnOkText: `Evet ${accounts.length} hesabı sil`
      }
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
        _moveIds.forEach(movAccId => {
          this.removeItem(movAccId);
        });


        this.selection.clear();
        this.bar.open('Taşıma işlemi başarıyla tamamlandı.', 'OK!', { duration: 5000 });
        this.loadData();
        this.categoryTotals();
      }

    });

  }

  removeItem(id): void {
    this.dataResult = this.dataResult.filter((value, key) => {
      return value.id != id;
    });

    this.dataSource.entitySubject.next(this.dataResult);
    this.dataSource.paginatorTotalSubject.next(this.dataResult.length);
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    column.visible = !column.visible;
  }

}
