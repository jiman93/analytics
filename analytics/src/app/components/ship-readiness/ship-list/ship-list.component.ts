import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppUtil } from '../../../common/AppUtil';
import { NotificationService } from '../../../common/NotificationService';

@Component({
  selector: 'app-ship-list',
  templateUrl: './ship-list.component.html',
  styleUrls: ['./ship-list.component.less'],
  providers: [NotificationService]
})
export class ShipListComponent {
  vm = this;
  displayedColumns = ['select', 'jobId','type','title','shipCategory','equipmentStatus','startDate','dueDate','status' ];
  
  dataSource: MatTableDataSource<UserData>;
  selection = new SelectionModel<UserData>(false, []); // no multiselect 
  filterCriteria = {
    data: [],
    filteredData: [],
    selectedColumn: "",
    jobId: { value: "" },
    type: { value: "" },
    title: { value: "" },
    shipCategory: { value: "" },
    equipmentStatus: { value: "" },
    startDate: { value: "" },
    dueDate: { value: "" },
    status: { value: "" }
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private notificationService: NotificationService) {

    const users: UserData[] = [];
    this.dataSource = new MatTableDataSource(users); // empty table first
    //this.dataSource.filterPredicate = this.onFilter; // *** too limited ***

  }

  ngOnInit() {
    this.vm = this;
    this.notificationService.addObserver().subscribe(notifyEvent => {
      console.log("ShipDashboard Notification event1 received", notifyEvent);
      if (notifyEvent) {
        switch (notifyEvent.eventId) {
          case "ship.details":
            var details = [];
            var jobs = notifyEvent.values; 
            for (var jobIdx = 0; jobIdx < jobs.length; jobIdx++) {
              var jobItem = jobs[jobIdx];
              var newJobItem = {
                jobId: jobItem.main.jobId,
                type: jobItem.main.type,
                title: jobItem.main.name,
                shipCategory: jobItem.main.shipCategory || jobItem.main.shipStatus,
                equipmentStatus: jobItem.main.equipmentStatus,
                startDate: jobItem.planning.estimatedStartDate,
                dueDate: jobItem.planning.estimatedEndDate,
                status: jobItem.main.jobStatus
              };
              details.push(newJobItem);
            }
            this.dataSource.data = details;
            this.filterCriteria.data = details; // the original data 
            
            break;
        }
      }
    });
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  applyColumnFilter(columnName, filterValue) {
    var search = filterValue.trim(); // Remove whitespace
    search = search.toLowerCase(); // Datasource defaults to lowercase matches
    this.filterCriteria[columnName].value = search;
    this.filterCriteria.selectedColumn = columnName;

    // wonder can use this.dataSource.filteredData??
    //this.dataSource.filter = filterValue;
    var data = this.filterCriteria.data; // the original data 
    console.log("applyColumnFilter", data);
    var newFilteredData = [];
    for (var dataIdx = 0; dataIdx < data.length; dataIdx++) {
      var filteredItem = data[dataIdx];
      var found = true; // by dfault
      for (var key in this.filterCriteria) {
        if (!found) {
          continue;
        }

        var filterItem = this.filterCriteria[key];
        if (filterItem.value && filterItem.value.length > 0) {
          var filterValue = filterItem.value;
          var fieldValue = "" + filteredItem[key];
          fieldValue = fieldValue.toLowerCase();
          if (fieldValue.indexOf(filterValue) === -1) {
            found = false;
            // do not continue
          }
          console.log("\t[" + key + "]", fieldValue, filterValue);
        }
      }
      if (found) {
        newFilteredData.push(filteredItem);
      }
    }
    // this.dataSource.filteredData = newFilteredData;
    this.dataSource.data = newFilteredData;
  }


  isAllSelected() {
    //console.log ("selected", JSON.stringify(this.selection.selected[0]));
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  onClickRow($event) {
    console.log("onClickRow", $event);
    if ($event.target) {
      console.log("clicked on ", $event.target.outerText);
    }
  }

}


export interface UserData {
  jobId: string;
  type: string;
  title: string;
  shipCategory: string;
  equipmentStatus: string;
  startDate: string;
  dueDate: string;
  status: string;
}

