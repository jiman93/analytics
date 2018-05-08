import { Component, OnInit, ViewEncapsulation, ViewChild, Input, SimpleChanges } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NotificationService } from '../../../common/NotificationService';

@Component({
  selector: 'app-ship-overall-readiness-dashboard',
  templateUrl: './ship-overall-readiness-dashboard.component.html',
  styleUrls: ['./ship-overall-readiness-dashboard.component.less'],
  providers: [NotificationService],
  encapsulation: ViewEncapsulation.None
})
export class ShipOverallReadinessDashboardComponent implements OnInit {
  //view: any[] = [800, 400]; // or don't set it?
  view: any[];
  categoryDashboard = {
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
    xAxisLabel: 'Ships',
    yAxisLabel: 'Highest Ship Category',
    colorScheme: {
      // green , red, yellowish, grey
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
          case "ship.chart.overallReadiness":
            // can't rely on this.seriesData
            // as the event comes later

            this.populateChartData(notifyEvent.values);
        }
      }
    });
  }

  populateChartData(values) {
    var lookupColor = {};
    var colorScheme = [];

    for (var shipIdx = 0; shipIdx < values.length; shipIdx++) {
      var shipItem = values[shipIdx];
      var category = shipItem.series[0].name;
      if (lookupColor[category]) {
        continue;
      }
      lookupColor[category] = category;
      switch (category) {
        case "5":
          colorScheme.push("#d72525");
          break;
        case "4":
          colorScheme.push("#f3a530");
          break;
        case "3":
          colorScheme.push("#ede60e");
          break;
        case "2":
          colorScheme.push("#33ba00");
          break;
        case "1":
          colorScheme.push("#3736b0");
          break;
        default:
          colorScheme.push("#AAAAAA"); // gray
          break;
      }
    }
    this.categoryDashboard.colorScheme.domain = colorScheme;
    this.categoryDashboard.data.multi = values;
  }
}
