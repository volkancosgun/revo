import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { SettingsComponent } from './settings/settings.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';

const routes: VexRoutes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'user/list',
        component: UserListComponent,
        data: {
            toolbarShadowEnabled: true
          }
    },
    {
        path: 'user/add',
        component: UserAddComponent
    },
    {
        path: 'settings',
        component: SettingsComponent

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }