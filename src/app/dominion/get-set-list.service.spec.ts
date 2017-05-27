import { TestBed, inject } from '@angular/core/testing';

import { GetSetListService } from './get-set-list.service';

describe('GetSetListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetSetListService]
    });
  });

  it('should ...', inject([GetSetListService], (service: GetSetListService) => {
    expect(service).toBeTruthy();
  }));
});
