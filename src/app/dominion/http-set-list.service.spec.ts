import { TestBed, inject } from '@angular/core/testing';

import { DominionSetNameListHttpService } from './http-set-list.service';

describe('GetSetNameListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DominionSetNameListHttpService]
    });
  });

  it('should ...', inject([DominionSetNameListHttpService], (service: DominionSetNameListHttpService) => {
    expect(service).toBeTruthy();
  }));
});
