import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupCategoriesComponent } from './add-sup-categories.component';

describe('AddSupCategoriesComponent', () => {
  let component: AddSupCategoriesComponent;
  let fixture: ComponentFixture<AddSupCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSupCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSupCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
