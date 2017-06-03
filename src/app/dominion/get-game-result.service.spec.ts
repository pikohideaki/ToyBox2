import { TestBed, inject } from '@angular/core/testing';

import { GameResultListService } from './get-game-result.service';

describe('GetGameResultService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameResultListService]
    });
  });

  it('should ...', inject([GameResultListService], (service: GameResultListService) => {
    expect(service).toBeTruthy();
  }));
});
