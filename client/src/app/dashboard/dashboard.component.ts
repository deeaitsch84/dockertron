import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {startWith, switchMap, tap} from "rxjs/operators";
import {ContainerInfo, ContainerStats} from "dockerode";
import {ContainerService} from "../services/container.service";
import {InfoService} from "../services/info.service";
import {NGXLogger} from "ngx-logger";
import {DateFormatPipe, LocalTimePipe} from "ngx-moment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  info: any = {};
  container: ContainerInfo[];
  stats: {[key: string] : ContainerStats} = {};
  private containerInterval: Subscription;
  private infoInterval: Subscription;
  private memoryData: Array<{name: string, series: Array<{name: string, value: any}>}> = [];
  private cpuData: Array<{name: string, series: Array<{name: string, value: any}>}> = [];

  constructor(
    private infoService: InfoService,
    private containerService: ContainerService,
    private logger: NGXLogger,
    private transformDatePipe: DateFormatPipe
  ) {
  }

  ngOnInit() {
    this.containerInterval = interval(5000)
      .pipe(
        startWith([]),
        tap(() => {
          //this.logger.debug("reload container")
        }),
        switchMap(() => this.containerService.list({filters : {"status": ["running"]}}))
      )
      .subscribe((container: ContainerInfo[]) => {
        //this.logger.debug("container reloaded", container);
        this.container = container;
        for(let containerInfo of this.container) {
          this.containerService.stats(containerInfo.Id)
            .pipe(
              tap(() => {
                //this.logger.debug("reload container stats", {id: containerInfo.Id})
              })
            ).subscribe((stats: ContainerStats) => {
              this.stats[containerInfo.Id] = stats;
              this.updateMemoryUsage(containerInfo.Id)
                .updateCpuUsage(containerInfo.Id);
              //this.logger.debug("container stats reloaded", stats);
          });
        }
      });

    this.infoInterval = interval(10000)
      .pipe(
        startWith([]),
        tap(() => {
          //this.logger.debug("lode common info")
        }),
        switchMap(() => this.infoService.getInfo())
      )
      .subscribe((info: any) => {
        //this.logger.debug("info loaded", info);
        this.info = info
      });
  }

  private updateMemoryUsage(containerId: string): DashboardComponent {
    const stats = this.stats[containerId];
    const memoryPercentage = Math.round((stats.memory_stats.usage / stats.memory_stats.limit) * 100);
    if(!isNaN(memoryPercentage)) {
      const container: ContainerInfo = this.container.find(c => c.Id === containerId);
      const name: string = container.Names[0];
      if(this.memoryData.find(d => d.name === name) === undefined) {
        this.memoryData.push({
          'name': name,
          series: []
        });
      }
      try {
        const date = this.transformDatePipe.transform(stats.read, 'HH:mm:ss');
        if(date != "") {
          this.memoryData.find(d => d.name === name).series.push({
            name: date,
            value: memoryPercentage
          });
        }
        this.memoryData = [...this.memoryData];
        //this.logger.debug("stuff series", this.memoryData);
      } catch (e) {

      }
    }
    return this;
  }

  ngOnDestroy(): void {
    this.containerInterval.unsubscribe();
  }

  private updateCpuUsage(containerId: string): DashboardComponent {
    const stats = this.stats[containerId];
    console.log(stats);
    //const cpuDelta = v.CPUStats.CPUUsage.TotalUsage - float64(previousCPU)
    const cpuDelta = stats.cpu_stats.cpu_usage.total_usage - stats.precpu_stats.cpu_usage.total_usage;
    // calculate the change for the entire system between readings
    //const systemDelta = float64(v.CPUStats.SystemUsage) - float64(previousSystem)
    const systemDelta = stats.cpu_stats.system_cpu_usage - stats.precpu_stats.system_cpu_usage;
    let cpuPercentage = 0.0;
    if (systemDelta > 0.0 && cpuDelta > 0.0) {
      cpuPercentage = (cpuDelta / systemDelta) * stats.cpu_stats.cpu_usage.percpu_usage.length * 100.0
    }
    console.log(cpuPercentage);
    if(!isNaN(cpuPercentage)) {
      const container: ContainerInfo = this.container.find(c => c.Id === containerId);
      const name: string = container.Names[0];
      if(this.cpuData.find(d => d.name === name) === undefined) {
        this.cpuData.push({
          'name': name,
          series: []
        });
      }
      try {
        const date = this.transformDatePipe.transform(stats.read, 'HH:mm:ss');
        if(date != "") {
          this.cpuData.find(d => d.name === name).series.push({
            name: date,
            value: cpuPercentage
          });
        }
        this.cpuData = [...this.cpuData];
        //this.logger.debug("update cpu usage", this.cpuData);
      } catch (e) {

      }
    }
    return this;
  }
}
