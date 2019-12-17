import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FleetComponent } from './fleet/fleet.component';
import { ShipComponent } from './fleet/ship/ship.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard }      from './login/auth.guard';
import { OrderedShipmentsComponent } from './shipments/ordered-shipments/ordered-shipments.component';
import { ContainersComponent } from './containers/containers.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'fleets', component: FleetComponent, canActivate: [AuthGuard]},
    { path: 'log', component: LoginComponent },
    { path: 'ship/:name', component: ShipComponent, canActivate: [AuthGuard]},
    { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
    { path: 'shipments', component: OrderedShipmentsComponent, canActivate: [AuthGuard]},
    { path: 'containers', component: ContainersComponent, canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/home', pathMatch: 'full'}
   
];
