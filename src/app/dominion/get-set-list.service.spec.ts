import { TestBed, inject } from '@angular/core/testing';

import { GetSetNameListService } from './get-set-list.service';

describe('GetSetNameListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSetNameListService]
    });
  });

  it('should ...', inject([GetSetNameListService], (service: GetSetNameListService) => {
    expect(service).toBeTruthy();
  }));
});
