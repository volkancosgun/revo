import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from 'src/app/pages/dashboard/dashboard-routing.module';
import { HomeComponent } from 'src/app/pages/dashboard/home/home.component';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { WidgetAssistantModule } from 'src/@vex/components/widgets/widget-assistant/widget-assistant.module';
import { MatIconModule } from '@angular/material/icon';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SecondaryToolbarModule,
        WidgetAssistantModule,
        MatIconModule,
        MatButtonModule,
        IconModule,
        BreadcrumbsModule

    ],
    exports: [],
    declarations: [
        HomeComponent
    ],
    providers: [],
})
export class DashboardModule { }
