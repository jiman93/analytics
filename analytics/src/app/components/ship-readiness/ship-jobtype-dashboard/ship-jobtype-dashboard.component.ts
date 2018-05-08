import { Component, OnInit, ViewEncapsulation, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificationService } from '../../../common/NotificationService';

@Component({
  selector: 'app-ship-jobtype-dashboard',
  templateUrl: './ship-jobtype-dashboard.component.html',
  styleUrls: ['./ship-jobtype-dashboard.component.less'],
  providers: [NotificationService],
  encapsulation: ViewEncapsulation.None
})
export class ShipJobtypeDashboardComponent implements OnInit {
  //view: any[] = [800, 400]; // or don't set it?
  view: any[];
  jobTypeDashboard = {
    data: {
      single: [], // reserved for future if a single view is preferred
      multi: [] // this will be loaded by the chart
    },
    showXAxis: true,
    showYAxis: true,
    gradient: true,
    showLegend: true,
    showXAxisLabel: true,
    showYAxisLabel: true,
    xAxisLabel: 'Ships by Job Type',
    yAxisLabel: 'Total Jobs',
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    actions: {
      "charts": {
        onSelect: function (event, vm) {
          console.log("charts.onSelect", event);
        }
      }
    }
  };

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.addObserver().subscribe(notifyEvent => {
      console.log("ShipDashboard Notification event1 received", notifyEvent);
      if (notifyEvent) {
        switch (notifyEvent.eventId) {
          case "ship.chart.jobtype":
            this.jobTypeDashboard.data.multi = notifyEvent.values;
            break;
        }
      }
    });
  }

  redraw () {
    var saved = this.jobTypeDashboard.data.multi;
    this.jobTypeDashboard.data.multi = JSON.parse(JSON.stringify(saved));
  }
}
