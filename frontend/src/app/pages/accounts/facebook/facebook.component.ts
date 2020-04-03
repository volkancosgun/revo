import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { Subject } from 'rxjs/internal/Subject';
import { startWith } from 'rxjs/internal/operators/startWith';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { timer } from 'rxjs/internal/observable/timer';
import { Subscription } from 'rxjs/internal/Subscription';
import { FbBotComponent } from 'src/app/pages/accounts/facebook/fb-bot/fb-bot.component';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { UpdateNotesDialogComponent } from 'src/app/shared/update-notes-dialog/update-notes-dialog.component';
import { environment } from 'src/environments/environment.prod';

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
    debounceTime(500),
    distinctUntilChanged()
  );

  activeCategory: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 = 2;
  me = this.authService.currentUserValue.user;
  selectUser: User;
  isLoading = true;
  createAcc: boolean = true;

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private accountService: AccountsService,
    private bar: MatSnackBar
  ) { }

  ngOnInit() {

    this.selectUser = this.me;

    const _appVersion = environment.version;
    const _locVersion = localStorage.getItem('app_version');

    if(_locVersion != _appVersion) {

      let _updateData = [
        {
          id:1,
          title: '[Hesaplar Modulü] Kaydırma çubuğu',
          msg: 'Hesap listeleme tablosunda notlar çok fazla uzun yazıldığı zaman sağdaki işlem butonları gözükmüyordu. Kaydırma çubuğu (soldan-sağa) eklenerek bu sorun ortadan kaldırıldı.'
        },
        {
          id: 2,
          title: '[Hesaplar Modulü] Hesap sayıları',
          msg: 'Her kategorinin üzerinde mevcut toplam hesap sayılarını gösteren rozetler eklendi. (sildiğiniz hesaplar hariçtir)'
        },
        {
          id: 3,
          title: '[Hesaplar Modulü] Yenileme butonu',
          msg: 'Verileri yenileme butonu tablonun sağ üst kısmına eklendi.'
        },
        {
          id: 4,
          title: '[Hesaplar Modulü] Ülke bazlı filtreleme',
          msg: 'Verileri ülke bazlı filtreleme butonu tablonun sağ üst kısmına eklendi.'
        },
        {
          id: 5,
          title: '[Hesaplar Modulü] Sütünları gizle/göster',
          msg: 'Hesaplar tablo sütunlarını gösterme ve gizleme butonu tablonun sağ üst kısmına eklendi.'
        },
        {
          id: 6,
          title: '[PHP BACKEND] API Yetkilendirme',
          msg: 'Arka uca bir yetkilendirme kontrol servisi kuruldu. Böylece hesaplara kullanıcı tokeni olmayan (kayıtsız) erişimler reddedilecek.'
        }
      ]

      const _dialogRef = this.dialog.open(UpdateNotesDialogComponent, {
        disableClose: true,
        width: '640px',
        data: _updateData
      });

    }

  }

  setData(e) {
    console.log(e);
  }

  filterChange(e) {
    console.log('filter')
  }

  updateData(data: FbAccount, index: number) {
    //this.tableData[index] = data;
  }


  openAccount() {

    this.createAcc = !this.createAcc;

  }


  openMenu() {
    this.menuOpen = true;
  }

  userChanged(user: User) {
    this.selectUser = user;
  }

  categoryChanged(cat: any) {
    this.activeCategory = cat;
  }

  openBot() {
    const dialogRef = this.dialog.open(FbBotComponent, {
      width: '480px',
      disableClose: true
    })
  }

}
