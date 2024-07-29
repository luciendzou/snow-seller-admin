import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovComponent } from './view-approv.component';

describe('ViewApprovComponent', () => {
  let component: ViewApprovComponent;
  let fixture: ComponentFixture<ViewApprovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewApprovComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApprovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
