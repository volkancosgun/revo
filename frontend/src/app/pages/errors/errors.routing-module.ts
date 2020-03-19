import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { Error404Component } from 'src/app/pages/errors/error404/error404.component';


const routes: VexRoutes = [
  {
      path: '',
      pathMatch: 'full',
      redirectTo: 'error-404'
  }, 
  {
      path: 'error-404',
      component: Error404Component,
      /* data: {
        containerEnabled: true,
        toolbarShadowEnabled: true
      } */
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ErrorsRoutingModule { }