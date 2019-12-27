import { Injectable } from '@angular/core';
import {DockerService} from "./docker.service";
import {Container} from "../model/container";
import {HttpClient} from "@angular/common/http";
import {ContainerSerializer} from "../serializer/container-serializer";

@Injectable({
  providedIn: 'root'
})
export class ContainerService extends DockerService<Container> {
  constructor(http: HttpClient) {
    super(
      http,
      'container',
      new ContainerSerializer());
  }
}
