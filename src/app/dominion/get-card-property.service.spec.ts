import { TestBed, inject } from '@angular/core/testing';

import { GetCardPropertyService } from './get-card-property.service';

describe('GetCardPropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetCardPropertyService]
    });
  });

  it('should ...', inject([GetCardPropertyService], (service: GetCardPropertyService) => {
    expect(service).toBeTruthy();
  }));
});
