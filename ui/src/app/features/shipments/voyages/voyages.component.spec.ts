import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentsModule } from '../shipments.module';
import { VoyagesComponent } from './voyages.component';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { ShipmentsService } from '../shipments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Voyage } from './Voyage';
import { By } from '@angular/platform-browser';


@Component({
  template: '<app-voyages [voyage]= "mockVoyage" (done)="handleVoyageEdit($event)"></app-voyages>'
})
class TestHostComponent {
  mockVoyage = { 'voyageID': 'P01', 'status': 'ordered'}
  selectedVoyages: Voyage;
  handleVoyageEdit(voyage: Voyage){
    this.selectedVoyages = voyage;
  }
}

describe('VoyagesComponent', () => {
  let component: VoyagesComponent;
  let fixture: ComponentFixture<TestHostComponent>;

const voyageServSub = {
  getVoyages(manuf){
    const voyages$ = cold('--x|', {x: [{'voyageID' : '001'}]})
    return  voyages$;
  }
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestHostComponent],
      imports: [ ShipmentsModule,
      BrowserAnimationsModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.debugElement.query(By.css('app-voyages')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have any voyages', () => {
    expect(component.voyages).toBeUndefined();
  });


});
