import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentsModule } from '../shipments.module';
import { VoyagesComponent } from './voyages.component';

describe('VoyagesComponent', () => {
  let component: VoyagesComponent;
  let fixture: ComponentFixture<VoyagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ ShipmentsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
