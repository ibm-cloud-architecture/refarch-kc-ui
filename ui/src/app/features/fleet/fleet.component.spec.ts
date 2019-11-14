import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipsComponent } from './ships/ships.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetComponent } from './fleet.component';
import { MatSelectModule } from '@angular/material/select';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';


describe('FleetComponent', () => {
  let component: FleetComponent;
  let fixture: ComponentFixture<FleetComponent>;
  const routes: Routes = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetComponent, ShipsComponent, LeafletMapComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        MatTableModule,
        MatIconModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
