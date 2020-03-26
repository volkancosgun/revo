import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input } from '@angular/core';
import { PopoverService } from '../popover/popover.service';
import { ToolbarUserDropdownComponent } from './toolbar-user-dropdown/toolbar-user-dropdown.component';
import icPerson from '@iconify/icons-ic/twotone-person';
import theme from '../../utils/tailwindcss';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { User } from 'src/app/_models/user';
import { interval, Observable } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { NavigationService } from 'src/@vex/services/navigation.service';
import { Jwt } from 'src/app/_models/jwt';
import { Role } from 'src/app/_models/role';
import icUSer from '@iconify/icons-ic/baseline-supervised-user-circle';
import icSetting from '@iconify/icons-ic/settings';

@Component({
  selector: 'vex-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserComponent implements OnInit {

  user: User;
  currentUser: Jwt;

  dropdownOpen: boolean;
  icPerson = icPerson;

  theme = theme;

  constructor(private popover: PopoverService,
    private cd: ChangeDetectorRef,
    private authService: AuthenticationService,
    private navigationService: NavigationService
  ) { }

  ngOnInit() {

    
    /* interval(10000)
      .pipe(
        startWith(0),
        switchMap(() => this.authService.me())
      ).subscribe((user:User) => {
        this.user = user;
        this.authService.updateCurrentUser(user);
        this.cd.markForCheck();
      }) */


      if(this.authService.isAdmin) {
        this.navigationService.items.push(
          {
            type: 'subheading',
            label: 'Admin',
            children: [
              {
                type: 'dropdown',
                label: 'Kullanıcı Yönetimi',
                icon: icUSer,
                children: [
                  {
                    type: 'link',
                    label: 'Kullanıcı Listesi',
                    route: '/admin/user/list'
                  },
                ]
              },
              {
                type: 'link',
                label: 'Ayarlar',
                route: '/admin/settings',
                icon: icSetting,
              },
            ]
          },
        );
      }


      /* this.navigationService.items.push(
        {
          type: 'link',
          label: 'Panelsafsafas',
          route: '/dashboard',
        },
      ); */


  }

  showPopover(originRef: HTMLElement) {
    this.dropdownOpen = true;
    this.cd.markForCheck();

    const popoverRef = this.popover.open({
      content: ToolbarUserDropdownComponent,
      origin: originRef,
      offsetY: 12,
      position: [
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
      ]
    });

    popoverRef.afterClosed$.subscribe(() => {
      this.dropdownOpen = false;
      this.cd.markForCheck();
    });
  }
}
