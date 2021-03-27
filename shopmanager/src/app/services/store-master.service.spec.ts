import { TestBed } from '@angular/core/testing';

import { StoreMasterService } from './store-master.service';

describe('StoreMasterService', () => {
  let service: StoreMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
