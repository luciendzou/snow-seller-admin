import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSupCategoriesComponent } from './update-sup-categories.component';

describe('UpdateSupCategoriesComponent', () => {
  let component: UpdateSupCategoriesComponent;
  let fixture: ComponentFixture<UpdateSupCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSupCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSupCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
