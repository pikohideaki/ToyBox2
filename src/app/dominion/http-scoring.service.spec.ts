import { TestBed, inject } from '@angular/core/testing';

import { ScoringService } from './http-scoring.service';

describe('ScoringService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScoringService]
    });
  });

  it('should ...', inject([ScoringService], (service: ScoringService) => {
    expect(service).toBeTruthy();
  }));
});
