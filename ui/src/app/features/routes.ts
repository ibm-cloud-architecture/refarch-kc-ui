import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FleetComponent } from './fleet/fleet.component';
import { ShipComponent } from './fleet/ship/ship.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'fleets', component: FleetComponent},
    { path: 'ship/:name', component: ShipComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
];
