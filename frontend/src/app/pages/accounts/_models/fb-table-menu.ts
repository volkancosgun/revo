import { Icon } from '@visurel/iconify-angular';

export interface FbTableMenu {
    type: 'link' | 'subheading';
    id?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
    icon?: Icon;
    label: string;
    classes?: {
        icon?: string;
    };
}