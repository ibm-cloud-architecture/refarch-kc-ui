import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderedShipmentsComponent } from './ordered-shipments/ordered-shipments.component';
import { VoyagesComponent } from './voyages/voyages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatSelectModule,
          MatTableModule,
          MatButtonModule,
          MatRadioModule,
          MatIconModule,
          MatInputModule,
          MatSortModule
         } from '@angular/material';
@NgModule({
  declarations: [OrderedShipmentsComponent, VoyagesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    MatSelectModule,
          MatTableModule,
          MatButtonModule,
          MatIconModule,
          MatRadioModule,
          MatInputModule,
          MatSortModule
  ]
})
export class ShipmentsModule { }
