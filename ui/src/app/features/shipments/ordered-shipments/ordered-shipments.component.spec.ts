import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedShipmentsComponent } from './ordered-shipments.component';

describe('OrderedShipmentsComponent', () => {
  let component: OrderedShipmentsComponent;
  let fixture: ComponentFixture<OrderedShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderedShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderedShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
