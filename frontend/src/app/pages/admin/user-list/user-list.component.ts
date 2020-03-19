import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AdminService } from '../_services/admin.service';
import { Observable, ReplaySubject } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatDialog, MatSnackBar } from '@angular/material';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { untilDestroyed } from 'ngx-take-until-destroy';

import theme from '../../../../@vex/utils/tailwindcss';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import banIcon from '@iconify/icons-bytesize/ban';
import bxsUserCheck from '@iconify/icons-bx/bxs-user-check';
import { UserCreateUpdateComponent } from './user-create-update/user-create-update.component';



@Component({
  selector: 'vex-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class UserListComponent implements OnInit, OnDestroy {
  layoutCtrl = new FormControl('boxed');

  subject$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  data$: Observable<User[]> = this.subject$.asObservable();
  users: User[];

  // Table defaults
  @Input()
  columns: TableColumn<User>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'TAM ADI', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'EMAİL', property: 'email', type: 'text', visible: true },
    { label: 'ROL', property: 'role', type: 'button', visible: true },
    { label: 'DURUM', property: 'status', type: 'button', visible: true },
    { label: 'İşlemler', property: 'actions', type: 'button', visible: true }
    /* { label: 'Ad Soyad', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Email', property: 'mail', type: 'text', visible: false },
    { label: 'İşlemler', property: 'actions', type: 'button', visible: true } */
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource: MatTableDataSource<User> | null;
  selection = new SelectionModel<User>(true, []);
  searchCtrl = new FormControl();

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;
  banIcon = banIcon;
  icUserCheck = bxsUserCheck;

  theme = theme;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private bar: MatSnackBar
  ) { }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  getData() {
    return this.adminService.getAllUser();
  }

  ngOnInit() {


    this.getData().subscribe(users => {
      this.subject$.next(users);
    })

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<User[]>(Boolean)
    ).subscribe(users => {
      this.users = users;
      this.dataSource.data = users;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  deleteUsers(users:User[]) {

    this.bar.open('Şu anda bu özellik kullanılamaz.', 'Tamam', {
      duration: 10000
    });

    return;

  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  editUser(user: User) {

    this.dialog.open(UserCreateUpdateComponent, { data: user }).afterClosed().subscribe(updateUser => {


      this.adminService.editUser(updateUser).subscribe((res:User) => {

        if(res) {
          const index = this.users.findIndex((existingCustomer) => existingCustomer.id === res.id);
        this.users[index] = res;
        this.subject$.next(this.users);
        }


      });


      /* const index = this.users.findIndex((extUser) => extUser.id === updateUser.formId);

      this.users[index] = new User(updateUser); */


     /*  this.customers[index] = new Customer(updatedCustomer);
      this.subject$.next(this.customers); */


    });


  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  confirmUser(user: User) {
    console.log(user);
  }

  bannedUser(user: User) {
    console.log(user);
  }

  unBannedUser(user: User) {
    console.log(user);
  }

  ngOnDestroy() {
  }

}
