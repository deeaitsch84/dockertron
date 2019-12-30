import { Injectable } from '@angular/core';
import {DockerService} from "./docker.service";
import {Container} from "dockerode";
import {map, switchMap, take} from "rxjs/operators";
import {PassThrough} from "stream";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContainerService {

  constructor(
    private dockerService: DockerService
  ) { }

  public list(options?: { all?: boolean, limit?: number, size?: boolean, filters?: any }) {
    return this.dockerService.docker(d => d.listContainers(options));
  }

  public stats(id: string) {
    return this.getContainer(id, c => c.stats({stream: false}));
  }

  public inspect(id: string) {
    return this.getContainer(id, c => c.inspect());
  }

  protected getContainer<T>(id: string, fn: (c: Container) => Promise<T>) {
    return this.dockerService.docker(d => fn(d.getContainer(id)));
  }
}
