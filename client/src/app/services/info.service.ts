import { Injectable } from '@angular/core';
import {DockerService} from "./docker.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private dockerService: DockerService
  ) { }

  getInfo() {
    return this.dockerService.docker(d => d.info());
  }
}
