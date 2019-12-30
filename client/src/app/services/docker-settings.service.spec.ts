import { TestBed } from '@angular/core/testing';

import { DockerSettingsService } from './docker-settings.service';

describe('DockerSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DockerSettingsService = TestBed.get(DockerSettingsService);
    expect(service).toBeTruthy();
  });
});
