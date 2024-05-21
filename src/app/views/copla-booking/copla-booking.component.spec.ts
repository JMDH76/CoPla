import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaBookingComponent } from './copla-booking.component';

describe('CoplaBookingComponent', () => {
  let component: CoplaBookingComponent;
  let fixture: ComponentFixture<CoplaBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaBookingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
