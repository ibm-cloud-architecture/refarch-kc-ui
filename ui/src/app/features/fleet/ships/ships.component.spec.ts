import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipsComponent } from './ships.component';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Ship } from '../ship/ship';


describe('ShipsComponent', () => {
  let component: ShipsComponent;
  let fixture: ComponentFixture<ShipsComponent>;
  const routes: Routes = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipsComponent, LeafletMapComponent ],
      imports: [
        MatTableModule,
        MatIconModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   
  it ('should have a fleet name', () => {
    expect(Ship.name).toBeDefined();
  })
});
