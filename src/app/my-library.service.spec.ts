import { TestBed, inject } from '@angular/core/testing';

import { MyLibraryService } from './my-library.service';

describe('MyLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyLibraryService]
    });
  });

  it('should ...', inject([MyLibraryService], (service: MyLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
