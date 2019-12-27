import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Container} from "../model/container";
import {Observable} from "rxjs";

import Modem from "docker-modem";

declare var Modem: any;

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  private modem: any;

  constructor(
    private http: HttpClient
  ) {
    this.modem = Modem({socketPath: '/var/run/docker.sock'});
    console.log(this.modem);

  }

  protected client(): HttpClient {
    return this.http;
  }

  getContainer(): Observable<Container[]> {
    return this.http.get<Container[]>("http://v1.24/containers/json");
  }
}
