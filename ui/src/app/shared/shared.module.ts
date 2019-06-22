import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TileComponent } from './tile/tile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule
  ],
  declarations: [FooterComponent, HeaderComponent, TileComponent],
  exports: [TileComponent, HeaderComponent, FooterComponent ]
})
export class SharedModule { }
