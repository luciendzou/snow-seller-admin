import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommandesComponent } from './view-commandes.component';

describe('ViewCommandesComponent', () => {
  let component: ViewCommandesComponent;
  let fixture: ComponentFixture<ViewCommandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCommandesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
