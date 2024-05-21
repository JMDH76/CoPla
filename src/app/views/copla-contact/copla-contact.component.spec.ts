import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaContactComponent } from './copla-contact.component';

describe('CoplaContactComponent', () => {
  let component: CoplaContactComponent;
  let fixture: ComponentFixture<CoplaContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
