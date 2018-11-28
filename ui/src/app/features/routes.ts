import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FleetComponent } from './fleet/fleet.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'fleets', component: FleetComponent},
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
];
