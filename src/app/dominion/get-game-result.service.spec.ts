import { TestBed, inject } from '@angular/core/testing';

import { GetGameResultService } from './get-game-result.service';

describe('GetGameResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetGameResultService]
    });
  });

  it('should ...', inject([GetGameResultService], (service: GetGameResultService) => {
    expect(service).toBeTruthy();
  }));
});
