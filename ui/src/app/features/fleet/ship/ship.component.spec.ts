import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulcontrolComponent } from '../../simulcontrol/simulcontrol.component';
import { ShipComponent } from './ship.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetService } from '../fleet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShipComponent', () => {
  let component: ShipComponent;
  let fixture: ComponentFixture<ShipComponent>;
  let fleetStub;

  const routes: Routes = []; 

  beforeEach(async(() => {
    let ship = { 'name': 'shiptest','maxRow':4, 'maxColum':6, 'containers':[],'longitude': '37.8226902168957',
    'latitude':'-122.3248956640928'};
    fleetStub = jasmine.createSpyObj("fleetStub", ['getSelectedShip']);
    fleetStub.getSelectedShip.and.returnValue(ship)
    TestBed.configureTestingModule({
      declarations: [ ShipComponent,SimulcontrolComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatToolbarModule,
        MatSelectModule,
        MatSliderModule,
        MatIconModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [  { provide: FleetService, useValue: fleetStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  create a ship', () => {
    expect(component.ship).toBeDefined();
  });
  
});
