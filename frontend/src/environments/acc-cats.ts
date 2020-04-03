import icViewHeadline from '@iconify/icons-ic/account-circle';
import icHistory from '@iconify/icons-ic/twotone-history';
import icAccounts from '@iconify/icons-ic/supervisor-account';
import icStar from '@iconify/icons-ic/twotone-star';
import icLabel from '@iconify/icons-ic/twotone-label';
import icPersonAdd from '@iconify/icons-ic/twotone-person-add';
import icPerson from '@iconify/icons-ic/twotone-person';
import icPage from '@iconify/icons-ic/bookmark';
import icNoPage from '@iconify/icons-ic/outline-bookmark-border';
import { FbTableMenu } from 'src/app/pages/accounts/_models/fb-table-menu';



export const AccCats: FbTableMenu[] = [
    {
        type: 'link',
        id: 1,
        icon: icViewHeadline,
        label: 'Ortak Hesaplar',
        count: 0
      },
      {
        type: 'link',
        id: 2,
        icon: icAccounts,
        label: 'Hesaplarım',
        count: 0
      },
      {
        type: 'link',
        id: 3,
        icon: icStar,
        label: 'Önemli',
        count: 0
      },
      {
        type: 'link',
        id: 4,
        icon: icPage,
        label: 'Sayfalı',
        count: 0
      },
      {
        type: 'link',
        id: 5,
        icon: icNoPage,
        label: 'Sayfasız',
        count: 0
      },
      /* {
        type: 'subheading',
        label: 'DİĞER'
      }, */
      {
        type: 'link',
        id: 6,
        icon: icLabel,
        label: 'Aktif',
        count: 0,
        classes: {
          icon: 'text-green-500'
        }
      },
      {
        type: 'link',
        id: 7,
        icon: icLabel,
        label: 'İşlemde',
        count: 0,
        classes: {
          icon: 'text-primary-500'
        }
      },
      {
        type: 'link',
        id: 8,
        icon: icLabel,
        label: 'Patlak',
        count: 0,
        classes: {
          icon: 'text-red-500'
        }
      },
      {
        type: 'link',
        id: 9,
        icon: icLabel,
        label: 'Çöp',
        count: 0,
        classes: {
          icon: 'text-gray-500'
        }
      },
]