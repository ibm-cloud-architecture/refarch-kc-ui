import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatSelectModule,
          MatTableModule,
          MatButtonModule,
          MatIconModule,
          MatInputModule,
          MatSortModule
         } from '@angular/material';
import { OrdersComponent } from './orders.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [OrdersComponent, OrderComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    CommonModule
  ]
})
export class OrdersModule { }
