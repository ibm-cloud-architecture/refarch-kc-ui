import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipComponent } from './ship.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';


describe('ShipComponent', () => {
  let component: ShipComponent;
  let fixture: ComponentFixture<ShipComponent>;
  let template: HTMLElement;
  const routes: Routes = []; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipComponent ],
      imports: [
        RouterTestingModule.withRoutes(routes)
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

  fit('should  create a ship', () => {
    fixture.detectChanges();
    expect(template).toBeDefined();
  });
  
});
