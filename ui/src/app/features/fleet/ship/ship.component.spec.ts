import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulcontrolComponent } from '../../simulcontrol/simulcontrol.component';
import { ShipComponent } from './ship.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
<<<<<<< HEAD
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetService } from '../fleet.service';

fdescribe('ShipComponent', () => {
=======
import { SimulcontrolComponent } from '../../simulcontrol/simulcontrol.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetService } from '../fleet.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShipComponent', () => {
>>>>>>> 7fb5dab0ed7aea53c778da24196214ed41c22a58
  let component: ShipComponent;
  let fixture: ComponentFixture<ShipComponent>;
  let template: HTMLElement;
  let fleetStub;

  const routes: Routes = []; 

  beforeEach(async(() => {
    let ship = { 'name': 'shiptest','maxRow':4, 'maxColum':6, 'containers':[],'longitude': '37.8226902168957',
    'latitude':'-122.3248956640928'};
    fleetStub = jasmine.createSpyObj("fleetStub", ['getSelectedShip']);
    fleetStub.getSelectedShip.and.returnValue(ship)
    TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [ ShipComponent, SimulcontrolComponent ],
=======
      declarations: [ ShipComponent,SimulcontrolComponent ],
>>>>>>> 7fb5dab0ed7aea53c778da24196214ed41c22a58
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatToolbarModule,
        MatSelectModule,
        MatSliderModule,
        MatIconModule,
<<<<<<< HEAD
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FleetService,
      { provide: ,  useValue: }
=======
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
>>>>>>> 7fb5dab0ed7aea53c778da24196214ed41c22a58
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
<<<<<<< HEAD
    fixture.detectChanges();
    expect(template).toBeDefined();
=======
    expect(component.ship).toBeDefined();
>>>>>>> 7fb5dab0ed7aea53c778da24196214ed41c22a58
  });
  
});
