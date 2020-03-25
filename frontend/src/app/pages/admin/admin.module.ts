import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';

import { PageLayoutModule } from '../../../@vex/components/page-layout/page-layout.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ContainerModule } from '../../../@vex/directives/container/container.module';
import { MatSelectModule } from '@angular/material/select';
import { ColorFadeModule } from '../../../@vex/pipes/color/color-fade.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule, MatDividerModule, MatSnackBarModule } from '@angular/material';


import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';



import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { WidgetAssistantModule } from 'src/@vex/components/widgets/widget-assistant/widget-assistant.module';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsModule } from '../../../@vex/components/breadcrumbs/breadcrumbs.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminService } from './_services/admin.service';
import { UserCreateUpdateComponent } from './user-list/user-create-update/user-create-update.component';
import { AdminSitesTableComponent } from './settings/admin-sites-table/admin-sites-table.component';



@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        SecondaryToolbarModule,
        WidgetAssistantModule,
        MatIconModule,
        MatButtonModule,
        IconModule,
        BreadcrumbsModule,
        PageLayoutModule,
        FlexLayoutModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatMenuModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        ContainerModule,
        MatSelectModule,
        ColorFadeModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatDividerModule,
        MatInputModule,
        MatRadioModule,
        MatSnackBarModule

    ],
    exports: [],
    declarations: [
        UserListComponent,
        UserAddComponent,
        SettingsComponent,
        UserCreateUpdateComponent,
        AdminSitesTableComponent
    ],
    entryComponents: [
        UserCreateUpdateComponent
    ],
    providers: [
        AdminService
    ],
})
export class AdminModule { }
