import { TestBed, inject } from '@angular/core/testing';

import { CardPropertyHttpService } from './get-card-property.service';

describe('GetCardPropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardPropertyHttpService]
    });
  });

  it('should ...', inject([CardPropertyHttpService], (service: CardPropertyHttpService) => {
    expect(service).toBeTruthy();
  }));
});
