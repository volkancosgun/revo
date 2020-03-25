import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookComponent } from './facebook/facebook.component';
import { AccountsRoutingModule } from './accounts-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AccountsService } from './_services/accounts.service';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { ContainerModule } from 'src/@vex/directives/container/container.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FbTableMenuComponent } from './facebook/fb-table-menu/fb-table-menu.component';
import { MatFormFieldModule, MatOptionModule, MatSelectModule, MatDialogModule, MatSnackBarModule, MatProgressBarModule, MatCardModule, MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { AdminService } from '../admin/_services/admin.service';
import { FbAccountEditComponent } from './facebook/fb-account-edit/fb-account-edit.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FbAccountDataComponent } from './facebook/fb-account-data/fb-account-data.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FbAccountMoveComponent } from './facebook/fb-account-move/fb-account-move.component';
import { FbBotComponent } from './facebook/fb-bot/fb-bot.component';
import { FbAccountDataServerComponent } from './facebook/fb-account-data-server/fb-account-data-server.component';

@NgModule({
  declarations: [
    FacebookComponent,
    FbTableMenuComponent,
    FbAccountEditComponent,
    FbAccountDataComponent,
    FbAccountMoveComponent,
    FbBotComponent,
    FbAccountDataServerComponent
  ],
  entryComponents: [
    FbAccountEditComponent,
    FbAccountMoveComponent,
    FbBotComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    FlexLayoutModule,
    IconModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDividerModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatListModule
  ],
  providers: [
    AccountsService,
    AdminService
  ]
})
export class AccountsModule { }
