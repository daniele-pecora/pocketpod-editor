import { TestBed } from '@angular/core/testing';

import { WebMidiApiService } from './web-midi-api.service';

describe('WebMidiApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebMidiApiService = TestBed.get(WebMidiApiService);
    expect(service).toBeTruthy();
  });
});
