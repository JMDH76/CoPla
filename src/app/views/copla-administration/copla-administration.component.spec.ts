import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaAdministrationComponent } from './copla-administration.component';

describe('CoplaAdministrationComponent', () => {
  let component: CoplaAdministrationComponent;
  let fixture: ComponentFixture<CoplaAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaAdministrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
