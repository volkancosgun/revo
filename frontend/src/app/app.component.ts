import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { ConfigName, ConfigService } from '../@vex/services/config.service';
import { MatIconRegistry } from '@angular/material/icon';
import { Settings } from 'luxon';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { NavigationService } from '../@vex/services/navigation.service';
import icLayers from '@iconify/icons-ic/twotone-layers';
import icAssigment from '@iconify/icons-ic/twotone-assignment';
import icContactSupport from '@iconify/icons-ic/twotone-contact-support';
import icDateRange from '@iconify/icons-ic/twotone-date-range';
import icChat from '@iconify/icons-ic/twotone-chat';
import icUSer from '@iconify/icons-ic/baseline-supervised-user-circle';
import icSetting from '@iconify/icons-ic/settings';
import facebookIcon from '@iconify/icons-fa-brands/facebook';
import linkIcon from '@iconify/icons-ic/link';
/* import baselineAddCircleOutline from '@iconify/icons-ic/baseline-add-circle-outline'; */
/* import adminTools from '@iconify/icons-dashicons/admin-tools'; */

import { LayoutService } from '../@vex/services/layout.service';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { SplashScreenService } from '../@vex/services/splash-screen.service';
import { Style, StyleService } from '../@vex/services/style.service';
import { User } from './_models/user';
import { AuthenticationService } from './shared/authentication.service';
import { Jwt } from './_models/jwt';
import { Role } from './_models/role';
import theme from '../@vex/utils/tailwindcss';

@Component({
  selector: 'vex-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vex';

  currentUser: Jwt;

  constructor(private configService: ConfigService,
    private styleService: StyleService,
    private iconRegistry: MatIconRegistry,
    private renderer: Renderer2,
    private platform: Platform,
    @Inject(DOCUMENT) private document: Document,
    @Inject(LOCALE_ID) private localeId: string,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private splashScreenService: SplashScreenService,
    private authService: AuthenticationService
  ) {

    this.authService.currentUser.subscribe(x => this.currentUser = x);

    this.iconRegistry.setDefaultFontSetClass('iconify');
    Settings.defaultLocale = this.localeId;

    if (this.platform.BLINK) {
      this.renderer.addClass(this.document.body, 'is-blink');
    }

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('rtl') && coerceBooleanProperty(queryParamMap.get('rtl')))
    ).subscribe(queryParamMap => {
      this.document.body.dir = 'rtl';
      this.configService.updateConfig({
        rtl: true,
      });
    });

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('layout'))
    ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

    this.route.queryParamMap.pipe(
      filter(queryParamMap => queryParamMap.has('style'))
    ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));

    let admin_menu = {};

    this.navigationService.items = [
      {
        type: 'link',
        label: 'Panel',
        route: '/dashboard',
        icon: icLayers
      },
      {
        type: 'link',
        label: 'Hesaplar',
        route: '/accounts/facebook',
        icon: facebookIcon
      },
      /* {
        type: 'subheading',
        label: 'Hesaplar',
        children: [
          {
            type: 'link',
            label: 'Facebook',
            route: '/accounts/facebook',
            icon: facebookIcon
          }
        ]
      }, */
      /* {
        type: 'subheading',
        label: 'Hesaplar',
        children: [
          {
            type: 'link',
            label: 'Facebook',
            route: '/accounts/facebook',
            icon: facebookIcon
          }
        ]
      },
      {
        type: 'subheading',
        label: 'Cloaker',
        children: [
          {
            type: 'link',
            label: 'Yeni Kampanya',
            route: '/accounts/facebook',
            icon: linkIcon
          },
          {
            type: 'link',
            label: 'Kampanya Listesi',
            route: '/accounts/facebook',
            icon: linkIcon
          },
        ]
      }, */
    ];





    /* this.styleService.setStyle('zeus' as Style) */
    this.configService.setConfig('vex-layout-ikaros' as ConfigName);
    /* this.configService.updateConfig({
      footer: {
        visible: false
      }
    }); */



  }

}
