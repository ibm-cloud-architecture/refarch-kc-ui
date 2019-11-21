import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderedShipmentsComponent } from './ordered-shipments/ordered-shipments.component';
import { VoyagesComponent } from './voyages/voyages.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

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
          MatSortModule,
  ]
})
export class ShipmentsModule { }
