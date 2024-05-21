import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaAsideComponent } from './copla-aside.component';

describe('CoplaAsideComponent', () => {
  let component: CoplaAsideComponent;
  let fixture: ComponentFixture<CoplaAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaAsideComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
