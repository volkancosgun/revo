import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsRoutingModule } from 'src/app/pages/errors/errors.routing-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';

import { Error404Component } from './error404/error404.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        ErrorsRoutingModule,
        FlexLayoutModule,
        MatButtonModule,
        IconModule
    ],
    exports: [],
    declarations: [Error404Component],
    providers: [],
})
export class ErrorsModule { }
