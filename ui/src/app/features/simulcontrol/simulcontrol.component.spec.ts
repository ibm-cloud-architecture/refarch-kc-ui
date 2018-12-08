import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulcontrolComponent } from './simulcontrol.component';

describe('SimulcontrolComponent', () => {
  let component: SimulcontrolComponent;
  let fixture: ComponentFixture<SimulcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimulcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimulcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
