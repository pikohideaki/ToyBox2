import { TestBed, inject } from '@angular/core/testing';

import { GetPlayersNameListService } from './get-players-name.service';

describe('GetPlayersNameListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetPlayersNameListService]
    });
  });

  it('should ...', inject([GetPlayersNameListService], (service: GetPlayersNameListService) => {
    expect(service).toBeTruthy();
  }));
});
