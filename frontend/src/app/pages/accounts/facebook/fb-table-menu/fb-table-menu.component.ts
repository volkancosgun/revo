import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Icon } from '@visurel/iconify-angular';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';

import icViewHeadline from '@iconify/icons-ic/account-circle';
import icHistory from '@iconify/icons-ic/twotone-history';
import icAccounts from '@iconify/icons-ic/supervisor-account';
import icStar from '@iconify/icons-ic/twotone-star';
import icLabel from '@iconify/icons-ic/twotone-label';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icPerson from '@iconify/icons-ic/twotone-person';
import icPage from '@iconify/icons-ic/bookmark';
import icNoPage from '@iconify/icons-ic/outline-bookmark-border';
import { FbAccount } from '../../_models/fb-account';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { AdminService } from 'src/app/pages/admin/_services/admin.service';
import { AccCats } from 'src/environments/acc-cats';
import { FbTableMenu } from 'src/app/pages/accounts/_models/fb-table-menu';


@Component({
  selector: 'vex-fb-table-menu',
  templateUrl: './fb-table-menu.component.html',
  styleUrls: ['./fb-table-menu.component.scss'],
  animations: [fadeInRight400ms, stagger40ms]
})
export class FbTableMenuComponent implements OnInit {

  me : User = this.authService.currentUserValue.user;
  users: User[];

  @Input() items: FbTableMenu[];
  @Output() filterChange = new EventEmitter<FbAccount[]>();
  @Output() openAddNew = new EventEmitter<void>();
  @Output() userChange = new EventEmitter<User>();
  @Output() categoryChange = new EventEmitter<any>();

  selectedUser;
  selectedUserValue : User;

  userName = this.authService.currentUserValue.user.name;
  activeCategory: FbTableMenu['id'] = 2;
  icPersonAdd = icPersonAdd;
  icPerson = icPerson;

  constructor(
    private authService: AuthenticationService,
    private adminService: AdminService
  ) { }

  ngOnInit() {

    this.selectedUser = this.me.id;

    if(this.me.role == 'admin') {
        this.adminService.getAllUser().subscribe((data: User[]) => {
          this.users = data;
        })
    }


    this.items = AccCats;
    this.items[1].label = 'Hesaplarım (' + this.me.name + ')';

  }

  setFilter(cat: FbTableMenu['id']) {
    this.activeCategory = cat;
    this.categoryChange.emit(cat);
  }

  setUser(val) {

    const index = this.users.findIndex((userEx) => userEx.id === val.value);
    const user = this.users[index];

    this.items[1].label = 'Hesaplarım (' + user.name + ')';

    this.userChange.emit(user);
  }

  isActive(category: FbTableMenu['id']) {
    return this.activeCategory === category;
  }

}
