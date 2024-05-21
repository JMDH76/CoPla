import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoplaDocumentsComponent } from './copla-documents.component';

describe('CoplaDocumentsComponent', () => {
  let component: CoplaDocumentsComponent;
  let fixture: ComponentFixture<CoplaDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoplaDocumentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoplaDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
