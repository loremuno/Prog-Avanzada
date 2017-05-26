import { TestBed, inject } from '@angular/core/testing';

import { ParametrosService } from './parametros.service';

describe('ParametrosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParametrosService]
    });
  });

  it('should ...', inject([ParametrosService], (service: ParametrosService) => {
    expect(service).toBeTruthy();
  }));
});
