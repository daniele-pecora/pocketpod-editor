import { TestBed } from '@angular/core/testing';

import { WebMidiService } from './web-midi.service';

describe('WebMidiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebMidiService = TestBed.get(WebMidiService);
    expect(service).toBeTruthy();
  });
});
