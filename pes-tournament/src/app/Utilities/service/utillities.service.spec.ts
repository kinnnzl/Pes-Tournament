import { TestBed } from '@angular/core/testing';

import { UtillitiesService } from './utillities.service';

describe('UtillitiesService', () => {
  let service: UtillitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtillitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
