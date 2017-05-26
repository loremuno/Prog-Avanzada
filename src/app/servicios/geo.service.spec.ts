import { TestBed, inject } from '@angular/core/testing';

import { GeoService } from './geo.service';

describe('GeoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoService]
    });
  });

  it('should ...', inject([GeoService], (service: GeoService) => {
    expect(service).toBeTruthy();
  }));
});
