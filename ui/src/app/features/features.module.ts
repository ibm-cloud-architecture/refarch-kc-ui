import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatSelectModule,
          MatTableModule,
          MatIconModule,
          MatSortModule,
          MatSliderModule
         } from '@angular/material';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FleetComponent } from './fleet/fleet.component';
import { HttpClientModule } from '@angular/common/http';
import { ShipsComponent } from './fleet/ships/ships.component';
import { ShipComponent } from './fleet/ship/ship.component';
import { LeafletMapComponent } from './fleet/leaflet-map/leaflet-map.component';
import { SimulcontrolComponent } from './simulcontrol/simulcontrol.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatSliderModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
      }),
  ],
  declarations: [HomeComponent, LoginComponent, FleetComponent, ShipsComponent, ShipComponent, SimulcontrolComponent, LeafletMapComponent, SimulcontrolComponent],
  exports: [ RouterModule, MatSelectModule ]
})
export class FeaturesModule { }
