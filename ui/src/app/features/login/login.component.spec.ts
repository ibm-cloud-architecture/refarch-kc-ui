import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';
import { FeaturesModule } from '../features.module';
import { LoginComponent } from './login.component';
import { User } from './User';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports : [
        SharedModule,
        FeaturesModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: []
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Inject the http service and test controller for each test

  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login known user', () => {
    // set user in login component
    component.user = new User();
    component.user.email = "freddie@email.com";
    component.user.password = "passw0rd";
    component.login();
    const req = httpTestingController.expectOne('/api/login');
    const loginRep: User = {firstname: 'Eddie', lastname: 'builder', password:'passw0rd', email : 'freddie@email.com' }
    req.flush(loginRep);
    expect(component.loggingIn).toBeTruthy();
  });
});
