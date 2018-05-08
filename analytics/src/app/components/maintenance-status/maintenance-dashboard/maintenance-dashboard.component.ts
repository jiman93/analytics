import { Component, OnInit, ViewEncapsulation, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificationService } from '../../../common/NotificationService';

@Component({
  selector: 'app-maintenance-dashboard',
  templateUrl: './maintenance-dashboard.component.html',
  styleUrls: ['./maintenance-dashboard.component.less'],
  providers: [NotificationService],
  encapsulation: ViewEncapsulation.None
})
export class MaintenanceDashboardComponent implements OnInit {

  @Input('seriesData') seriesData: any[] = [];
  //view: any[] = [800, 400]; // or don't set it?
  view: any[];
  maintenananceLevelDashBoard = {
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
    xAxisLabel: 'Ships by Maintenance Level',
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
          case "maintenance.chart.category":
            // can't rely on this.seriesData
            // as the event comes later
            this.maintenananceLevelDashBoard.data.multi = notifyEvent.values;
            break;
        }
      }
    });
  }
}

