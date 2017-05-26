import { TestBed, inject } from '@angular/core/testing';

import { GeocodingApiServiceService } from './geocoding-api-service.service';

describe('GeocodingApiServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocodingApiServiceService]
    });
  });

  it('should ...', inject([GeocodingApiServiceService], (service: GeocodingApiServiceService) => {
    expect(service).toBeTruthy();
  }));
});
