import { TestBed } from '@angular/core/testing';

import { LeaugeService } from './leauge.service';

describe('LeaugeService', () => {
  let service: LeaugeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaugeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
