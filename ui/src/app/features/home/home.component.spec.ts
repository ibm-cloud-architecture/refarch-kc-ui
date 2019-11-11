import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { TileComponent } from '../../shared/tile/tile.component';
import { HomeComponent } from './home.component';
import { Routes } from '@angular/router';



describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const routes: Routes = []

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, TileComponent, ],
      imports: [
       
        RouterTestingModule.withRoutes(routes)
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an order tile', () => {
    const tile = fixture.debugElement.query(By.css('#order'))
    expect(tile).toBeDefined();
    expect(tile.componentInstance.urlPath).toContain('order');
  });
});
