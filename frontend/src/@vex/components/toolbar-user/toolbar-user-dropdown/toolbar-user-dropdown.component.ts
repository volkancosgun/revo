import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem } from '../interfaces/menu-item.interface';
import { trackById } from '../../../utils/track-by';
import icPerson from '@iconify/icons-ic/twotone-person';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icMoveToInbox from '@iconify/icons-ic/twotone-move-to-inbox';
import icListAlt from '@iconify/icons-ic/twotone-list-alt';
import icTableChart from '@iconify/icons-ic/twotone-table-chart';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icAccessTime from '@iconify/icons-ic/twotone-access-time';
import icDoNotDisturb from '@iconify/icons-ic/twotone-do-not-disturb';
import icOfflineBolt from '@iconify/icons-ic/twotone-offline-bolt';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icArrowDropDown from '@iconify/icons-ic/twotone-arrow-drop-down';
import icBusiness from '@iconify/icons-ic/twotone-business';
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import icLock from '@iconify/icons-ic/twotone-lock';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import { Icon } from '@visurel/iconify-angular';
import { PopoverRef } from '../../popover/popover-ref';
import { ApiService } from 'src/app/shared/api.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { User } from 'src/app/_models/user';
import { Jwt } from 'src/app/_models/jwt';
import { Observable } from 'rxjs';

export interface OnlineStatus {
  id: 'online' | 'away' | 'dnd' | 'offline';
  label: string;
  icon: Icon;
  colorClass: string;
}

@Component({
  selector: 'vex-toolbar-user-dropdown',
  templateUrl: './toolbar-user-dropdown.component.html',
  styleUrls: ['./toolbar-user-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserDropdownComponent implements OnInit {

  user: User;

  items: MenuItem[] = [
    {
      id: '1',
      icon: icAccountCircle,
      label: 'Hesabım',
      description: 'Hesap ayarları burada olacak.',
      colorClass: 'text-teal-500',
      route: '/accounts/facebook'
    },
    /* {
      id: '2',
      icon: icMoveToInbox,
      label: 'My Inbox',
      description: 'Messages & Latest News',
      colorClass: 'text-primary-500',
      route: '/apps/chat'
    },
    {
      id: '3',
      icon: icListAlt,
      label: 'My Projects',
      description: 'Tasks & Active Projects',
      colorClass: 'text-amber-500',
      route: '/apps/scrumboard'
    },
    {
      id: '4',
      icon: icTableChart,
      label: 'Billing Information',
      description: 'Pricing & Current Plan',
      colorClass: 'text-purple-500',
      route: '/pages/pricing'
    } */
  ];

  statuses: OnlineStatus[] = [
    {
      id: 'online',
      label: 'Çevrimiçi',
      icon: icCheckCircle,
      colorClass: 'text-green-500'
    },
    {
      id: 'away',
      label: 'Dışarıda',
      icon: icAccessTime,
      colorClass: 'text-orange-500'
    },
    {
      id: 'dnd',
      label: 'Rahatsız Etmeyin',
      icon: icDoNotDisturb,
      colorClass: 'text-red-500'
    },
    {
      id: 'offline',
      label: 'Çevrimdışı',
      icon: icOfflineBolt,
      colorClass: 'text-gray-500'
    }
  ];

  activeStatus: OnlineStatus = this.statuses[0];

  trackById = trackById;
  icPerson = icPerson;
  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icArrowDropDown = icArrowDropDown;
  icBusiness = icBusiness;
  icVerifiedUser = icVerifiedUser;
  icLock = icLock;
  icNotificationsOff = icNotificationsOff;

  constructor(private cd: ChangeDetectorRef,
              private popoverRef: PopoverRef<ToolbarUserDropdownComponent>,
              private api:ApiService,
              private router: Router,
              private authService: AuthenticationService
            ) { }

  ngOnInit() {

    this.authService.me().subscribe((user: User) => {
      this.user = user;
      this.authService.updateCurrentUser(user);
      this.cd.markForCheck();
      
    });


  }

  setStatus(status: OnlineStatus) {
    this.activeStatus = status;
    this.cd.markForCheck();
  }

  close() {
    this.popoverRef.close();
  }

  logout() {
    this.authService.logout().subscribe(data => {
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubject.next(null);
      //this.router.navigate(['/auth/login']);
      location.reload(true);
  }, error => {
      localStorage.removeItem('currentUser');
      this.authService.currentUserSubject.next(null);
      location.reload(true);
  });
  }
}
