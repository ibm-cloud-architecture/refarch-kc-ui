import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulcontrolComponent } from '../../simulcontrol/simulcontrol.component';
import { ShipComponent } from './ship.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FleetService } from '../fleet.service';

fdescribe('ShipComponent', () => {
  let component: ShipComponent;
  let fixture: ComponentFixture<ShipComponent>;
  let template: HTMLElement;
  const routes: Routes = []; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipComponent, SimulcontrolComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        MatToolbarModule,
        MatSelectModule,
        MatSliderModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        FleetService,
      { provide: ,  useValue: }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    template = fixture.nativeElement.querySelector('./ship.component.html');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should  create a ship', () => {
    fixture.detectChanges();
    expect(template).toBeDefined();
  });
  
});
