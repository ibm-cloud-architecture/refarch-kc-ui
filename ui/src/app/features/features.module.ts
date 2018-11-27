import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FleetComponent } from './fleet/fleet.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
      }),
  ],
  declarations: [HomeComponent, LoginComponent, FleetComponent],
  exports: [ RouterModule ]
})
export class FeaturesModule { }
