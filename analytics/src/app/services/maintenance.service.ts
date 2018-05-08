import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import * as NodeAsync from 'async'
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AppUtil } from '../common/AppUtil';
import * as moment from 'moment'

@Injectable()
// contract is 3 tier. project -> 1.. many contracts. contract ---> 1 .. many workpackages
export class MaintenanceService {
    LIMIT: number = 50;
    static JOBS: any;

    constructor(private http: Http) {
        console.log("ShipService()")
    }

    // must be called first
    public getMaintenanceJobs(shipId: string, startDate: string, totalWeeks: number, onSuccess, onError) {
        var vm = this;
        vm.loadJobs(shipId, startDate, totalWeeks).subscribe(response => {
            console.log("getMaintenanceJobs.downloading ... ", response);
            MaintenanceService.JOBS = response.jobs;
            onSuccess(MaintenanceService.JOBS);
            return; // ok
        });
    }

    /*
    var criteria = {
      fromDate: "YYYY-MM-DD",
      totalWeeks: 52,
      dlm: "ON",
      ilm: "ON",
      olm: "ON" 
    } */
    public getMaintenanceCostsSeriesByMaintenanceLevel(criteria: any) {
        var seriesData = [];
        if (MaintenanceService.JOBS) {
            var lookupShip = {};
            for (var jobIdx = 0; jobIdx < MaintenanceService.JOBS.length; jobIdx++) {
                var jobItem = MaintenanceService.JOBS[jobIdx];
                var newColumnKey = jobItem.main.shipId;
                if (!lookupShip[newColumnKey]) {
                    var newColumnItem = {
                        name: "" + newColumnKey,
                        series: {}
                    };
                    lookupShip[newColumnKey] = newColumnItem;
                }
                var columnItem = lookupShip[newColumnKey];
                var newSeriesKey = this.getValidMaintenanceLevel(jobItem.main.maintenanceLevel);
                if (!columnItem.series[newSeriesKey]) {
                    var newSeriesItem = {
                        name: "" + newSeriesKey,
                        value: 0
                    };
                    columnItem.series[newSeriesKey] = newSeriesItem;
                }
                var seriesItem = columnItem.series[newSeriesKey];
                seriesItem.value++;
            }
        }

        // now convert to ngx-Data stackedColumn format
        // [
        //   {
        //     "name": "Germany",
        //     "series": [
        //       {
        //         "name": "2010",
        //         "value": 40632
        //       }
        //     ]
        //   }
        // ]
        for (var columnKey in lookupShip) {
            var columnItem = lookupShip[columnKey];
            var newSeriesDataItem = {
                name: columnItem.name,
                series: []
            };
            seriesData.push(newSeriesDataItem);
            for (var seriesKey in columnItem.series) {
                var seriesItem = columnItem.series[seriesKey];
                newSeriesDataItem.series.push(seriesItem);
            }
        }
        seriesData.sort(function (item1, item2) {
            return item1.name > item2.name ? 1 : -1;
        });
        return seriesData;
    }

    public getShipSeriesByJobType(criteria: any) {
        var seriesData = [];
        if (MaintenanceService.JOBS) {
            var lookupShip = {};
            for (var jobIdx = 0; jobIdx < MaintenanceService.JOBS.length; jobIdx++) {
                var jobItem = MaintenanceService.JOBS[jobIdx];
                var newColumnKey = jobItem.main.shipId;
                if (!lookupShip[newColumnKey]) {
                    var newColumnItem = {
                        name: "" + newColumnKey,
                        series: {}
                    };
                    lookupShip[newColumnKey] = newColumnItem;
                }
                var columnItem = lookupShip[newColumnKey];
                var newSeriesKey = jobItem.main.type;
                if (newSeriesKey === "REFIT" || newSeriesKey === "RFT") {
                    newSeriesKey = "REFIT";
                }
                if (!columnItem.series[newSeriesKey]) {
                    var newSeriesItem = {
                        name: "" + newSeriesKey,
                        value: 0
                    };
                    columnItem.series[newSeriesKey] = newSeriesItem;
                }
                var seriesItem = columnItem.series[newSeriesKey];
                seriesItem.value++;
            }
        }

        // now convert to ngx-Data stackedColumn format
        // [
        //   {
        //     "name": "Germany",
        //     "series": [
        //       {
        //         "name": "2010",
        //         "value": 40632
        //       }
        //     ]
        //   }
        // ]
        for (var columnKey in lookupShip) {
            var columnItem = lookupShip[columnKey];
            var newSeriesDataItem = {
                name: columnItem.name,
                series: []
            };
            seriesData.push(newSeriesDataItem);
            for (var seriesKey in columnItem.series) {
                var seriesItem = columnItem.series[seriesKey];
                newSeriesDataItem.series.push(seriesItem);
            }
        }
        seriesData.sort(function (item1, item2) {
            return item1.name > item2.name ? 1 : -1;
        });
        return seriesData;
    }

    loadJobs(shipId, startDate, noOfWeeks): Observable<any> {
        // need PREV jobs only as it has the maintenanceLevel
        // http://localhost:8080/v1/lams/analytics/jobCosts/weeks/:shipId/:startDate/:numWeeks?facilityCode=ALL&title=ALL&types=PREV,JOB&statuses=ALL,COMPLETED,NEW,INTRAY,IN_PROGRESS,FORWARDED_TO_SHORE
        var url = "/v1/lams/analytics/jobCosts/weeks/" + shipId + "/" + startDate + "/" + noOfWeeks;
        url += "?faciltiyCode=ALL&title=ALL&planTypes=PREV&statuses=COMPLETED,NEW,IN_PROGRESS,FORWARDED_TO_SHORE";
        console.log("loadJobs() ...", url);

        return this.http.get(url)
            .map((res: any) => res.json())
            .catch(error => Observable.throw(error.json()));
    }

    getValidMaintenanceLevel(maintenanceLevel) {
        var MAINTENANCE_LEVELS = ["OLM", "ILM", "DLM", "UNKNOWN"];
        var output = maintenanceLevel;
        if (!output) {
            output = "UNKNOWN";
        }
        if (MAINTENANCE_LEVELS.indexOf(maintenanceLevel) === -1) {
            output = "Other";
        }
        return output;
    }

}