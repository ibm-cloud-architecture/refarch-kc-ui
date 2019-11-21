import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { OrdersComponent } from './orders.component';
import { OrderComponent } from './order/order.component';
import { HttpConfigInterceptor } from './errorInterceptor';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material';
import { ErrorDialogService } from 'src/app/error-dialog/errordialog.service';

@NgModule({
  declarations: [OrdersComponent, OrderComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatInputModule,
    CommonModule,
    ToastrModule,
    MatDialogModule
  ],
  providers: [ 
    ErrorDialogService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor, 
    multi: true
  },
]
})
export class OrdersModule { }
