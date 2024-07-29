import { TestBed } from '@angular/core/testing';

import { SouscategoriesService } from './souscategories.service';

describe('SouscategoriesService', () => {
  let service: SouscategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouscategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
