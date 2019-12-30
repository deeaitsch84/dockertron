import {Injectable, OnDestroy} from '@angular/core';
import * as Dockerode from 'dockerode';
import {Modem} from 'docker-modem';
import {BehaviorSubject, from, Subject} from "rxjs";
import {ElectronService} from "../core/services";
import {switchMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DockerService implements OnDestroy {

  protected dockerSubject = new BehaviorSubject<Dockerode>(null);

  private disposed = new Subject();

  constructor(
    private electronService: ElectronService
  ) {
    this.dockerSubject.next(new Dockerode());
  }

  public docker<T>(fn: (api: Dockerode) => Promise<T>) {
    return this.dockerSubject
      .pipe(
        switchMap(docker => from(fn(docker)))
      );
  }

  public modem() {
    return this.docker(d => Promise.resolve(d.modem as Modem))
      .pipe(take(1));
  }

  public ngOnDestroy() {
    this.disposed.next();
    this.disposed.unsubscribe();
  }

}
