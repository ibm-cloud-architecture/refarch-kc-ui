import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentsModule } from '../shipments.module';
import { OrderedShipmentsComponent } from './ordered-shipments.component';

describe('OrderedShipmentsComponent', () => {
  let component: OrderedShipmentsComponent;
  let fixture: ComponentFixture<OrderedShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ ShipmentsModule ]
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
