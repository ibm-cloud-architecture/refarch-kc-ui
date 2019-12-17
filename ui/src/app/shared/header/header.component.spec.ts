import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';


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
      imports: [ MatToolbarModule ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: Router, useValue: mockRouter } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router); 
    //location = TestBed.get(Location);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have a title', () => {
    expect(component.title).toBeDefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // The HTML as a routerlink to home
  // As a rule you test the component, not the router, and care only 
  // if the component navigates with the right address under the given conditions.
/*
  excluding this test for now

  xit('should go to home url when clicking on home link', () => {
    const link = fixture.debugElement.query(By.css('#home'));
    //link.click();
    fixture.whenStable().then(() => {
      const routerService = TestBed.get(Router);
      //expect(routerService.navigate.calls.any()).toBe(true, 'navigate called');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['home']);
    })
  }); */
});
