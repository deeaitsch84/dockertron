import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Resource} from "../model/resource";
import {Serializer} from "../serializer/serializer";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {AppConfig} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DockerService<T extends Resource> {

  private readonly url: string;
  constructor(
    private http: HttpClient,
    endpoint: string,
    private serializer: Serializer
  ) {
    this.url = AppConfig.dockertronApiUrl + '/' + endpoint;
  }

  protected client(): HttpClient {
    return this.http;
  }

  public create(item: T): Observable<T> {
    return this.client()
      .post<T>(`${this.url}`, this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  public update(item: T): Observable<T> {
    return this.client()
      .put<T>(`${this.url}/${item.id}`,
        this.serializer.toJson(item))
      .pipe(map(data => this.serializer.fromJson(data) as T));
  }

  read(id: number): Observable<T> {
    return this.client()
      .get(`${this.url}/${id}`)
      .pipe(map((data: any) => this.serializer.fromJson(data) as T));
  }

  list(params: HttpParams): Observable<T[]> {
    return this.client()
      .get(`${this.url}`, {params})
      .pipe(map((data: any) => this.convertData(data.items)));
  }

  delete(id: number) {
    return this.client()
      .delete(`${this.url}/${id}`);
  }

  private convertData(data: any): T[] {
    return data.map(item => this.serializer.fromJson(item));
  }

}
