import { Component, OnInit } from '@angular/core';
import { Notification } from '../interfaces/notification.interface';
import { DateTime } from 'luxon';
import { trackById } from '../../../utils/track-by';
import icSettings from '@iconify/icons-ic/twotone-settings';
import icChevronRight from '@iconify/icons-ic/twotone-chevron-right';
import icNotificationsOff from '@iconify/icons-ic/twotone-notifications-off';
import icClearAll from '@iconify/icons-ic/twotone-clear-all';
import icShoppingBasket from '@iconify/icons-ic/twotone-shopping-basket';
import icAccountCircle from '@iconify/icons-ic/twotone-account-circle';
import icInsertChart from '@iconify/icons-ic/twotone-insert-chart';
import icCheckCircle from '@iconify/icons-ic/twotone-check-circle';
import icDescription from '@iconify/icons-ic/twotone-description';
import icFeedback from '@iconify/icons-ic/twotone-feedback';
import icVerifiedUser from '@iconify/icons-ic/twotone-verified-user';
import icFileCopy from '@iconify/icons-ic/twotone-file-copy';

@Component({
  selector: 'vex-toolbar-notifications-dropdown',
  templateUrl: './toolbar-notifications-dropdown.component.html',
  styleUrls: ['./toolbar-notifications-dropdown.component.scss']
})
export class ToolbarNotificationsDropdownComponent implements OnInit {

  notifications: Notification[] = [
    {
      id: '1',
      label: 'Deneme bildirimi',
      icon: icShoppingBasket,
      colorClass: 'text-primary-500',
      datetime: DateTime.local().minus({ hour: 1 })
    },
    {
      id: '2',
      label: 'Deneme bildirimi',
      icon: icAccountCircle,
      colorClass: 'text-orange-500',
      datetime: DateTime.local().minus({ hour: 2 })
    },
    {
      id: '3',
      label: 'Deneme bildirimi',
      icon: icInsertChart,
      colorClass: 'text-purple-500',
      datetime: DateTime.local().minus({ hour: 5 })
    },
    {
      id: '4',
      label: 'Deneme bildirimi',
      icon: icCheckCircle,
      colorClass: 'text-green-500',
      datetime: DateTime.local().minus({ hour: 9 })
    },
    {
      id: '5',
      label: 'Deneme bildirimi',
      icon: icDescription,
      colorClass: 'text-primary-500',
      datetime: DateTime.local().minus({ hour: 30 })
    },
    {
      id: '6',
      label: 'Deneme bildirimi',
      icon: icFeedback,
      colorClass: 'text-orange-500',
      datetime: DateTime.local().minus({ hour: 40 }),
      read: true
    },
    {
      id: '7',
      label: 'Deneme bildirimi',
      icon: icVerifiedUser,
      colorClass: 'text-green-500',
      datetime: DateTime.local().minus({ hour: 60 })
    },
    {
      id: '8',
      label: 'Deneme bildirimi',
      icon: icFileCopy,
      colorClass: 'text-amber-500',
      datetime: DateTime.local().minus({ hour: 90 })
    }
  ];

  icSettings = icSettings;
  icChevronRight = icChevronRight;
  icClearAll = icClearAll;
  icNotificationsOff = icNotificationsOff;
  trackById = trackById;

  constructor() { }

  ngOnInit() {
  }

}
