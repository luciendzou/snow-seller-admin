import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubCategoriesComponent } from './update-sub-categories.component';

describe('UpdateSubCategoriesComponent', () => {
  let component: UpdateSubCategoriesComponent;
  let fixture: ComponentFixture<UpdateSubCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSubCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSubCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
