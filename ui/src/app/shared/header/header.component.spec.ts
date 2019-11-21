import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { routes } from '../../features/routes';
// import { HomeComponent } from '../../features/home/home.component';
// import { FleetComponent } from '../../features/fleet/fleet.component';
// import { LoginComponent } from '../../features/login/login.component';
// import { ShipComponent } from '../../features/fleet/ship/ship.component';
// import { OrdersComponent } from '../../features/orders/orders.component';
// import { OrderedShipmentsComponent } from '../../features/shipments/ordered-shipments/ordered-shipments.component';
// import { TileComponent } from '../tile/tile.component';
// import { MatSelectModule } from '@angular/material/select';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatIconModule } from '@angular/material/icon';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FleetService } from '../../features/fleet/fleet.service';
// import { SimulcontrolComponent } from '../../features/simulcontrol/simulcontrol.component';


fdescribe('HeaderComponent', () => {
  let location: Location;
  let router: Router;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter;


  beforeEach(async(() => {
    
    mockRouter = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
      // RouterTestingModule modules sets up the router with a spy implementation of the Location Strategy that doesn’t actually change the URL.
      imports: [RouterTestingModule.withRoutes(routes),
       MatToolbarModule,
      ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Router, useValue: mockRouter } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router); 
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a title', () => {
    expect(component.title).toBeDefined();
  });
  
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  // The HTML as a routerlink to home
  // As a rule you test the component, not the router, and care only 
  // if the component navigates with the right address under the given conditions.
  xit('should go to home url when clicking on home link', () => {
    const link = fixture.debugElement.query(By.css('#home'));
   // link.click();
    fixture.whenStable().then(() => {
      const routerService = TestBed.get(Router);
      expect(routerService.navigate.calls.any()).toBe(true, 'navigate called');
      //expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
    })
  });
});
