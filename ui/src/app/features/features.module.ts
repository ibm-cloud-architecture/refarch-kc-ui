import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { FleetComponent } from './fleet/fleet.component';

import { ShipsComponent } from './fleet/ships/ships.component';
import { ShipComponent } from './fleet/ship/ship.component';
import { LeafletMapComponent } from './fleet/leaflet-map/leaflet-map.component';
import { SimulcontrolComponent } from './simulcontrol/simulcontrol.component';
import { OrdersModule } from './orders/orders.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { LoginModule } from './login/login.module';
import { ContainersModule } from './containers/containers.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatSliderModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false
      }),
    OrdersModule,
    LoginModule,
    ShipmentsModule,
    ContainersModule
  ],
  declarations: [HomeComponent, FleetComponent, ShipsComponent, ShipComponent, SimulcontrolComponent, LeafletMapComponent],
  exports: [ RouterModule ]
})
export class FeaturesModule { }
