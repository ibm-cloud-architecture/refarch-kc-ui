import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SimulcontrolComponent } from './simulcontrol.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SimulcontrolComponent', () => {
  let component: SimulcontrolComponent;
  let fixture: ComponentFixture<SimulcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSelectModule,
                MatSliderModule,
                FormsModule,
                ReactiveFormsModule,
                MatIconModule,
                HttpClientTestingModule,
                RouterTestingModule,
                BrowserAnimationsModule],
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
