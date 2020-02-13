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
});
