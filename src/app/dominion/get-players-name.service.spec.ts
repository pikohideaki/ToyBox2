import { TestBed, inject } from '@angular/core/testing';

import { PlayersNameListService } from './get-players-name.service';

describe('GetPlayersNameListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayersNameListService]
    });
  });

  it('should ...', inject([PlayersNameListService], (service: PlayersNameListService) => {
    expect(service).toBeTruthy();
  }));
});
