import { Component, OnInit } from '@angular/core';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';

import icContacts from '@iconify/icons-ic/twotone-contacts';
import icSearch from '@iconify/icons-ic/twotone-search';
import icStar from '@iconify/icons-ic/twotone-star';
import icMenu from '@iconify/icons-ic/twotone-menu';
import { FbAccount } from '../_models/fb-account';
import { User } from 'src/app/_models/user';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { FbAccountEditComponent } from './fb-account-edit/fb-account-edit.component';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { AccountsService } from 'src/app/pages/accounts/_services/accounts.service';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { ProgressDialogComponent } from 'src/app/shared/progress-dialog/progress-dialog.component';
import { FbAccountMoveComponent } from 'src/app/pages/accounts/facebook/fb-account-move/fb-account-move.component';


@Component({
  selector: 'vex-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class FacebookComponent implements OnInit {
  icContacts = icContacts;
  icSearch = icSearch;
  icStar = icStar;
  icMenu = icMenu;

  menuOpen = false;
  searchCtrl = new FormControl();

  searchStr$ = this.searchCtrl.valueChanges.pipe(
    debounceTime(10)
  );

  activeCategory: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 2;
  me = this.authService.currentUserValue.user;
  selectUser: User;
  isLoading = true;
  tableColumns: TableColumn<FbAccount>[] = [
    {
      label: '',
      property: 'selected',
      type: 'checkbox',
      cssClasses: ['w-6']
    },
    {
      label: 'TARİH',
      property: 'created_at',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'LOGIN',
      property: 'uname',
      type: 'text',
      //cssClasses: ['font-medium']
    },
    {
      label: 'PASS',
      property: 'upass',
      type: 'text',
      //cssClasses: ['font-medium']
    },
    {
      label: 'ÜLKE',
      property: 'country',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: 'DİL',
      property: 'lang',
      type: 'text',
      cssClasses: ['text-secondary']
    },
    {
      label: '',
      property: 'starred',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10']
    },
    {
      label: '',
      property: 'menu',
      type: 'button',
      cssClasses: ['text-secondary', 'w-10']
    },
  ];
  tableData: FbAccount[];

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private accountService: AccountsService,
    private bar: MatSnackBar
  ) { }

  ngOnInit() {

    this.selectUser = this.me;
    this.getData();

  }

  getData(): void {

    this.isLoading = true;
    this.accountService.getListingAccounts(this.activeCategory, this.selectUser.unumber).subscribe((res: FbAccount[]) => {
      this.isLoading = false;
      this.tableData = res;
    }, err => {
      this.isLoading = false;
    });
  }

  setData(data: FbAccount[]) {
    this.tableData = data;
    this.menuOpen = false;
  }

  updateData(data: FbAccount, index: number) {
    this.tableData[index] = data;
  }


  openAccount(id?: FbAccount['id']) {

    const account = this.tableData.find(c => c.id === id);



    this.dialog.open(FbAccountEditComponent, {
      data: { account_id: id || null, account_data: account, account_category: this.activeCategory, account_user: this.selectUser },
      width: '600px'
    }).afterClosed().subscribe((res: any) => {

      if (res && res.isUpdate === false) {

        this.getData();

      } else {
        if (res && this.activeCategory != account.category) {

          this.tableData = this.tableData.filter((value, key) => {
            return value.id != account.id;
          });

        }
      }

    });

  }

  toggleStar(id: FbAccount['id']) {
    const account = this.tableData.find(c => c.id === id);

    if (account) {
      account.starred = !account.starred;
      this.accountService.changeStarredAccount(id, account.starred).subscribe(res => {
        console.log('fav eklendi');
      }, err => {
        account.starred = !account.starred;
      })
    }
  }

  openMenu() {
    this.menuOpen = true;
  }

  userChanged(user: User) {
    this.selectUser = user;
    this.getData();
  }

  categoryChanged(cat: any) {
    this.activeCategory = cat;
    this.getData();
  }

  moveAccounts(accounts: FbAccount[]) {
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
        account_user: this.selectUser,
        account_category: this.activeCategory,
        title: _dialogTitle,
        msg: _dialogMsg,
        btnCancelText: 'Vazgeç',
        btnOkText: `Evet ${accounts.length} hesabı sil`
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      
      if(res) {
        _moveIds.forEach(movAccId => {

          this.tableData = this.tableData.filter((val, key) => {
            return val.id != movAccId;
          });

        });

        this.bar.open('Taşıma işlemi başarıyla tamamlandı.', 'OK!', { duration: 5000 });
      }

    });

  }

  deleteAccounts(accounts: FbAccount[]) {
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

          this.accountService.deletingAccounts(_delIds).subscribe((res: any) => {

            if (!res.error) {

              _delIds.forEach(delAccId => {

                this.tableData = this.tableData.filter((val, key) => {
                  return val.id != delAccId;
                });

              });

              this.bar.open('Silme işlemi başarıyla tamamlandı.', 'OK!', { duration: 5000 });

              progressRef.close();

            }


          }, err => {
            this.bar.open('Beklenmedik bir hata oluştu.', 'OK!', { duration: 5000 });
            progressRef.close();
          });

        }, 1000);
      }

    });



  }

  deleteAccount(id: FbAccount['id']) {

    const account = this.tableData.find(c => c.id === id);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      //width: '340px',
      data: { title: 'İşlem onayı', msg: `<strong>${account.uname}</strong> adlı hesap silinecek! Onaylıyor musunuz?<br> <small class="text-secondary"><strong class="text-red-500">UYARI:</strong> Bu işlemi onaylamanız halinde hesap verisini kaybedeceğinizi unutmayın!</small>`, btnCancelText: 'Vazgeç', btnOkText: 'Onayla' }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (true) {

        account.status = -1;

        this.accountService.createUpdateAccount(account, true).subscribe(res => {

          this.tableData = this.tableData.filter((value, key) => {
            return value.id != account.id;
          });

        });

      }
    });

  }

}
