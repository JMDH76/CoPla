import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaParcelsRegistryComponent } from './copla-parcels-registry.component';

describe('CoplaParcelsRegistryComponent', () => {
  let component: CoplaParcelsRegistryComponent;
  let fixture: ComponentFixture<CoplaParcelsRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaParcelsRegistryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaParcelsRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
