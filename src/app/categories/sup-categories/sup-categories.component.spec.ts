import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupCategoriesComponent } from './sup-categories.component';

describe('SupCategoriesComponent', () => {
  let component: SupCategoriesComponent;
  let fixture: ComponentFixture<SupCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
