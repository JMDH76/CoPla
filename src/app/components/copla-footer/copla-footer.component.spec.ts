import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaFooterComponent } from './copla-footer.component';

describe('CoplaFooterComponent', () => {
  let component: CoplaFooterComponent;
  let fixture: ComponentFixture<CoplaFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
