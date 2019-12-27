import {Component, OnInit} from '@angular/core';
import {Container} from "../model/container";
import {ContainerService} from "../services/container.service";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  container: Container[];

  constructor(
    private containerService: ContainerService
  ) {
  }

  ngOnInit() {
    this.containerService.list(new HttpParams()).subscribe((container: Container[]) => this.container = container);
  }

}
