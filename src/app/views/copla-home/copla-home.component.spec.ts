import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaHomeComponent } from './copla-home.component';

describe('CoplaHomeComponent', () => {
  let component: CoplaHomeComponent;
  let fixture: ComponentFixture<CoplaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
