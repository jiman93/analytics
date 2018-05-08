import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import * as NodeAsync from 'async'
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { AppUtil } from '../common/AppUtil';
import * as moment from 'moment'

@Injectable()
// contract is 3 tier. project -> 1.. many contracts. contract ---> 1 .. many workpackages
export class ShipService {
    LIMIT: number = 50;
    static JOBS: any;
    SHIPS_IDS = {
        "01": { name: "KD KEDAH" },
        "02": { name: "KD PAHANG" },
        "03": { name: "KD PERAK" },
        "04": { name: "KD TRENGGANU" },
        "05": { name: "KD KELANTAN" },
        "06": { name: "KD SELANGOR" }
    };

    constructor(private http: Http) {
        console.log("ShipService()")
    }

    // must be called first
    public getShipJobs(shipId: string, startDate: string, totalWeeks: number, onSuccess, onError) {
        var vm = this;
        vm.loadJobs(shipId, startDate, totalWeeks).subscribe(response => {
            console.log("getShipJobs.downloading ... ", response);
            ShipService.JOBS = response.plannerItems.jobs;
            onSuccess(ShipService.JOBS);
            return; // ok
        });
    }

    public getShipOverallReadinessTable(criteria: any) {
        var tableData = [];
        /*
        var SHIPS = ["01", "02", "03", "04", "05", "06"]; // configure this somewhere
        if (ShipService.JOBS) {
            var lookupShip = {};
            for (var jobIdx = 0; jobIdx < ShipService.JOBS.length; jobIdx++) {
                var jobItem = ShipService.JOBS[jobIdx];
                var newColumnKey = jobItem.main.shipId;
                if (!lookupShip[newColumnKey]) {
                    var newColumnItem = {
                        shipId: "" + newColumnKey,
                        name: this.getShipName(newColumnKey),
                        shipCategory: "",
                        maxShipCategory: "",
                        totalUrdef: 0,
                        totalGurdef: 0,
                        totalOthers : 0,
                        totalDefects: 0
                    };
                    lookupShip[newColumnKey] = newColumnItem;
                }
                var columnItem = lookupShip[newColumnKey];

                var shipCategory = jobItem.main.shipCategory;
                // Refit jobs is unique. it is like a shipCategory
                if (jobItem.main.type === "REFIT" || jobItem.main.type === "RFT") {
                    shipCategory = "5";
                }
                if (!shipCategory) {
                    shipCategory = jobItem.main.shipStatus;
                }
                if (shipCategory > columnItem.maxShipCategory) {
                    columnItem.maxShipCategory = shipCategory;
                    columnItem.shipCategory = shipCategory;
                }

                var jobType = this.getClientJobType(jobItem.main.type);
                switch 
                if (jobType)



            }

            // add those without any entries : mark it as ready "1"
            for (var shipIdx = 0; shipIdx < SHIPS.length; shipIdx++) {
                var shipId = SHIPS[shipIdx];
                if (!lookupShip[shipId]) {
                    var newColumnItem = {
                        name: "" + shipId,
                        series: {}
                    };
                    lookupShip[shipId] = newColumnItem;

                    var shipCategory = "1";
                    var newSeriesItem = {
                        name: "" + shipCategory,
                        value: 1
                    };
                    newColumnItem.series[shipCategory] = newSeriesItem;
                }
            }

            var newLookupShip = {};
            for (var columnKey in lookupShip) {
                var columnItem = lookupShip[columnKey];
                var maxShipCategory = "";
                for (var seriesKey in columnItem.series) {
                    if (seriesKey > maxShipCategory) {
                        maxShipCategory = seriesKey;
                    }
                }
                var newOverallColumnItem = {
                    name: "" + columnKey,
                    series: {}
                };

                var value = parseInt(maxShipCategory);
                value = (6 - value) * 20;
                newOverallColumnItem.series[maxShipCategory] = {
                    name: "" + maxShipCategory,
                    value: value // in percentage
                };
                newLookupShip[columnKey] = newOverallColumnItem;
            }
            lookupShip = newLookupShip; // replace eit
        }

        for (var columnKey in lookupShip) {
            var columnItem = lookupShip[columnKey];
            var newSeriesDataItem = {
                name: columnItem.name,
                series: []
            };
            tableData.push(newSeriesDataItem);
            for (var seriesKey in columnItem.series) {
                var seriesItem = columnItem.series[seriesKey];
                newSeriesDataItem.series.push(seriesItem);
            }
        }
        tableData.sort(function (item1, item2) {
            return item1.name > item2.name ? 1 : -1;
        });
        */
        return tableData;
    }

    public getShipOverallReadinessSeries(criteria: any) {
        var seriesData = [];
        var SHIPS = ["01", "02", "03", "04", "05", "06"]; // configure this somewhere
        if (ShipService.JOBS) {
            var lookupShip = {};
            for (var jobIdx = 0; jobIdx < ShipService.JOBS.length; jobIdx++) {
                var jobItem = ShipService.JOBS[jobIdx];
                var newColumnKey = jobItem.main.shipId;
                if (!lookupShip[newColumnKey]) {
                    var newColumnItem = {
                        name: "" + newColumnKey,
                        series: {}
                    };
                    lookupShip[newColumnKey] = newColumnItem;
                }
                var columnItem = lookupShip[newColumnKey];
                var newSeriesKey = jobItem.main.shipCategory;
                // Refit jobs is unique. it is like a shipCategory
                if (jobItem.main.type === "REFIT" || jobItem.main.type === "RFT") {
                    newSeriesKey = "5";
                }
                if (!newSeriesKey) {
                    newSeriesKey = jobItem.main.shipStatus;
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

            // add those without any entries : mark it as ready "1"
            for (var shipIdx = 0; shipIdx < SHIPS.length; shipIdx++) {
                var shipId = SHIPS[shipIdx];
                if (!lookupShip[shipId]) {
                    var newColumnItem = {
                        name: "" + shipId,
                        series: {}
                    };
                    lookupShip[shipId] = newColumnItem;

                    var shipCategory = "1";
                    var newSeriesItem = {
                        name: "" + shipCategory,
                        value: 1
                    };
                    newColumnItem.series[shipCategory] = newSeriesItem;
                }
            }

            var newLookupShip = {};
            for (var columnKey in lookupShip) {
                var columnItem = lookupShip[columnKey];
                var maxShipCategory = "";
                for (var seriesKey in columnItem.series) {
                    if (seriesKey > maxShipCategory) {
                        maxShipCategory = seriesKey;
                    }
                }
                var newOverallColumnItem = {
                    name: "" + columnKey,
                    series: {}
                };

                var value = parseInt(maxShipCategory);
                value = (6 - value) * 20;
                newOverallColumnItem.series[maxShipCategory] = {
                    name: "" + maxShipCategory,
                    value: value // in percentage
                };
                newLookupShip[columnKey] = newOverallColumnItem;
            }
            lookupShip = newLookupShip; // replace eit
        }

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

    public getShipSeriesByCategory(criteria: any) {
        var seriesData = [];
        if (ShipService.JOBS) {
            var lookupShip = {};
            for (var jobIdx = 0; jobIdx < ShipService.JOBS.length; jobIdx++) {
                var jobItem = ShipService.JOBS[jobIdx];
                var newColumnKey = jobItem.main.shipId;
                if (!lookupShip[newColumnKey]) {
                    var newColumnItem = {
                        name: "" + newColumnKey,
                        series: {}
                    };
                    lookupShip[newColumnKey] = newColumnItem;
                }
                var columnItem = lookupShip[newColumnKey];
                var newSeriesKey = jobItem.main.shipCategory;
                if (!newSeriesKey) {
                    newSeriesKey = jobItem.main.shipStatus;
                }
                // Refit jobs is unique. it is like a shipCategory
                // Refit is "5"
                if (jobItem.main.type === "REFIT" || jobItem.main.type === "RFT") {
                    newSeriesKey = "5";
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

    public getShipSeriesByJobType(criteria: any) {
        var seriesData = [];
        if (ShipService.JOBS) {
            var lookupShip = {};
            for (var jobIdx = 0; jobIdx < ShipService.JOBS.length; jobIdx++) {
                var jobItem = ShipService.JOBS[jobIdx];
                var newColumnKey = jobItem.main.shipId;
                if (!lookupShip[newColumnKey]) {
                    var newColumnItem = {
                        name: "" + newColumnKey,
                        series: {}
                    };
                    lookupShip[newColumnKey] = newColumnItem;
                }
                var columnItem = lookupShip[newColumnKey];
                var newSeriesKey = this.getClientJobType(jobItem.main.type);
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
        console.log("loadJobs() ...");

        // /v1/lams/ship/criteria/:shipId/:startDate/:noOfWeeks?faciltiyCode=ALL&planTypes=ALL,JOBREQ,PREV,JOB&title=ALL
        var url = "/v1/lams/ships/criteria/" + shipId + "/" + startDate + "/" + noOfWeeks;
        url += "?faciltiyCode=ALL&planTypes=JOB&title=ALL";

        return this.http.get(url)
            .map((res: any) => res.json())
            .catch(error => Observable.throw(error.json()));
    }

    getClientJobType(jobType) {
        var output = "UNKNOWN";
        switch (jobType) {
            case "PREV":
                output = "Preventive";
                break;
            case "REFIT":
            case "RFT":
                output = "Refit";
                break;
            case "COURGENT":
                output = "Urdef";
                break;
            case "COGURDEF":
                output = "Gurdef";
                break;
            case "CORR":
            case "COGUARANTEED":
            default:
                output = "Other";
                break;
        }
        return output;
    }

    getShipName(shipId) {
        var output = "UNKNOWN ship " + shipId;
        if (this.SHIPS_IDS[shipId]) {
            output = this.SHIPS_IDS[shipId].name;
        }
        return output;
    }
}