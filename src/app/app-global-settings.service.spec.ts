import { TestBed } from '@angular/core/testing';

import { AppGlobalSettingsService } from './app-global-settings.service';

describe('AppGlobalSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppGlobalSettingsService = TestBed.get(AppGlobalSettingsService);
    expect(service).toBeTruthy();
  });
});
