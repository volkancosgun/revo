import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { FacebookComponent } from './facebook/facebook.component';

const routes: VexRoutes = [
    {
        path: '',
        component: FacebookComponent
    },
    {
        path: 'facebook',
        component: FacebookComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AccountsRoutingModule { }