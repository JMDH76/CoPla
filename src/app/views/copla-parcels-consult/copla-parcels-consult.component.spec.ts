import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaParcelsConsultComponent } from './copla-parcels-consult.component';

describe('CoplaParcelsConsultComponent', () => {
  let component: CoplaParcelsConsultComponent;
  let fixture: ComponentFixture<CoplaParcelsConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaParcelsConsultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaParcelsConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
