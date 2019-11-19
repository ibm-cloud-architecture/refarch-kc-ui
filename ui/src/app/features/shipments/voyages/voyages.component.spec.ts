import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShipmentsModule } from '../shipments.module';
import { VoyagesComponent } from './voyages.component';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { ShipmentsService } from '../shipments.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

fdescribe('VoyagesComponent', () => {
  let component: VoyagesComponent;
  let fixture: ComponentFixture<VoyagesComponent>;

const voyageServSub = {
  getVoyages(manuf){
    const voyages$ = cold('--x|', {x: [{'voyageID' : '001'}]})
    return  voyages$;
  }
}

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [ ShipmentsModule,
      BrowserAnimationsModule ],
      providers: [ { provide: ShipmentsService, useValue: voyageServSub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoyagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should not have any voyages', () => {
    expect(component.voyages).toBeUndefined();
  })

  // it('should get the selected voyage on click', () => {
  //   expect(component.voyages).toBeUndefined();
  //   component.loadVoyages('manuf');
  //   getTestScheduler().flush();
  //   component.open(component.voyages[0]);
  //   expect(component.selectedVoyage.voyageID).toBe("001");
  // });

});
