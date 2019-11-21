import { OnInit } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-errordialog',
  templateUrl: './errordialog.component.html'
})

export class ErrorDialogComponent {
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
