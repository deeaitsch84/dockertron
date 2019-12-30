import { TestBed } from '@angular/core/testing';

import { DockerService } from './docker.service';

describe('DockerApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DockerService = TestBed.get(DockerService);
    expect(service).toBeTruthy();
  });
});
