import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppUtil } from './../../../common/AppUtil';
import { NotificationService } from './../../../common/NotificationService';

@Component({
  selector: 'app-jr-list',
  templateUrl: './jr-list.component.html',
  styleUrls: ['./jr-list.component.less']
})
export class JrListComponent implements OnInit {
  private jobRequests: any = [];
  displayedColumns = ['select', 'facility', 'equipment', 'jobRequestNo', 'title', 'type', 'dateRequested', 'fromSection', 'toSection', 'status'];
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(false, []); // no multiselect 

  filterCriteria = {
    data: [],
    filteredData: [],
    selectedColumn: "",
    jobRequestNo: { value: "" },
    facility: { value: "" },
    type: { value: "" },
    title: { value: "" },
    equipment: { value: "" },
    dateRequested: { value: "" },
    fromSection: { value: "" },
    toSection: { value: "" },
    status: { value: "" }
  };

  JOB_REQUESTS:any = [
    {
      "jobRequestId": "05-REQ-000000058",
      "jobId": "05-COR-000000256",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "05"
      },
      "title": "test job request internal",
      "equipment": "KD KELANTAN",
      "dateRequested": "2018-03-28",
      "fromSection": "ME",
      "toSection": "WE",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "05-REQ-000000059",
      "jobId": "",
      "status": "NEW",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "05"
      },
      "title": "test forward to shore",
      "equipment": "KD KELANTAN",
      "dateRequested": "2018-03-28",
      "fromSection": "ME",
      "toSection": "PVM2",
      "requestor": "",
      "jobReqStatus": "NEW"
    },
    {
      "jobRequestId": "05-REQ-000000060",
      "jobId": "05-COR-000000269",
      "status": "APPROVED",
      "priority": "HIGH",
      "type": "CORR",
      "location": {
        "facilityCode": "0545110"
      },
      "title": "MONITOR SHOWS NO DISPLAY",
      "equipment": "NAVIGATION RADAR SYSTEM",
      "dateRequested": "2018-04-03",
      "fromSection": "WE",
      "toSection": "PVM1",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "05-REQ-000000061",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0545110"
      },
      "title": "TEST #01",
      "equipment": "NAVIGATION RADAR SYSTEM",
      "dateRequested": "2018-04-03",
      "fromSection": "WE",
      "toSection": "PVM2",
      "requestor": "NAVIGATION RADAR SYSTEM",
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000119",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "URGENT",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "Test JobReq0223301 [0] - modified",
      "equipment": "STBD PROPULSION DIESEL ENGINE",
      "dateRequested": "20170807",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 1,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000120",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "HIGH",
      "type": "CORR",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "Test JobReq0223301 [1]",
      "equipment": "STBD PROPULSION DIESEL ENGINE",
      "dateRequested": "20170824",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 5,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000121",
      "jobId": "",
      "status": "APPROVED",
      "priority": "MEDIUM",
      "type": "RFT",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "Test JobReq0223301 [2]",
      "equipment": "STBD PROPULSION DIESEL ENGINE",
      "dateRequested": "2018-03-21",
      "fromSection": "GUN",
      "toSection": "PVCM",
      "requestor": "305",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000122",
      "jobId": "",
      "status": "COMPLETED",
      "priority": "MEDIUM",
      "type": "RFT",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "Test JobReq0223301 [3]",
      "equipment": "STBD PROPULSION DIESEL ENGINE",
      "dateRequested": "20170805",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 7,
      "jobReqStatus": "COMPLETED"
    },
    {
      "jobRequestId": "REQ-0000000123",
      "jobId": "",
      "status": "APPROVED",
      "priority": "URGENT",
      "type": "PREV",
      "location": {
        "facilityCode": "0223302"
      },
      "title": "Test JobReq0223302 [0]",
      "equipment": "POWER GEN UNIT 1",
      "dateRequested": "2017-07-24",
      "fromSection": "WE",
      "toSection": "PVCM",
      "requestor": 3,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000124",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0223302"
      },
      "title": "Test JobReq0223302 [1]",
      "dateRequested": "20170908",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 3,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000125",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0223302"
      },
      "title": "Test JobReq0223302 [2]",
      "equipment": "Test",
      "dateRequested": "20170929",
      "fromSection": "ME",
      "toSection": "LPWR",
      "requestor": 7,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000126",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "PREV",
      "location": {
        "facilityCode": "0223302"
      },
      "title": "Test JobReq0223302 [3]",
      "equipment": "Test",
      "dateRequested": "2017-09-20",
      "fromSection": "WE",
      "toSection": "PVM1",
      "requestor": 1,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000127",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0223302"
      },
      "title": "Test JobReq0223302 [4]",
      "equipment": "Test",
      "dateRequested": "20170913",
      "fromSection": "ME",
      "toSection": "WE",
      "requestor": 0,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000128",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "URGENT",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Test JobReq0231101 [0]",
      "equipment": "Test",
      "dateRequested": "20170812",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 1,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000129",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Test JobReq0231101 [1]",
      "dateRequested": "20171006",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 6,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000130",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "PREV",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Test JobReq0231101 [2]",
      "dateRequested": "20170807",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 2,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000131",
      "jobId": "",
      "status": "APPROVED",
      "priority": "URGENT",
      "type": "RFT",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Test JobReq0231101 [3]",
      "equipment": "Test",
      "dateRequested": "2017-09-05",
      "fromSection": "WE",
      "toSection": "PVCM",
      "requestor": 5,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000132",
      "jobId": "",
      "status": "ASSIGNED",
      "priority": "MEDIUM",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Test JobReq0231101 [4]",
      "dateRequested": "20170823",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 5,
      "jobReqStatus": "ASSIGNED"
    },
    {
      "jobRequestId": "REQ-0000000134",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "PREV",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [0]",
      "dateRequested": "20170807",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 6,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000135",
      "jobId": "",
      "status": "APPROVED",
      "priority": "HIGH",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [1]",
      "dateRequested": "2017-08-07",
      "equipment": "Test",
      "fromSection": "ME",
      "toSection": "PVCM",
      "requestor": 0,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000136",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "MEDIUM",
      "type": "RFT",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [2]",
      "dateRequested": "20170928",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 0,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000137",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [3]",
      "dateRequested": "20171008",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 7,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000138",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "MEDIUM",
      "type": "RFT",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [4]",
      "dateRequested": "20170722",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 6,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000139",
      "jobId": "",
      "status": "APPROVED",
      "priority": "URGENT",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [5]",
      "dateRequested": "20170930",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 7,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000140",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "URGENT",
      "type": "CORR",
      "location": {
        "facilityCode": "0231102"
      },
      "title": "Test JobReq0231102 [6]",
      "dateRequested": "20170716",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 6,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000141",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "URGENT",
      "type": "RFT",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [0]",
      "dateRequested": "20170919",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 5,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000142",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "MEDIUM",
      "type": "CORR",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [1]",
      "dateRequested": "20171005",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 5,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "REQ-0000000143",
      "jobId": "",
      "status": "NEW",
      "priority": "MEDIUM",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [2]",
      "dateRequested": "20170927",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 0,
      "jobReqStatus": "NEW"
    },
    {
      "jobRequestId": "REQ-0000000144",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "MEDIUM",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [3]",
      "dateRequested": "20170920",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 8,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000145",
      "jobId": "",
      "status": "APPROVED",
      "priority": "URGENT",
      "type": "COGUARANTEED",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [4]",
      "dateRequested": "20170912",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 7,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000146",
      "jobId": "",
      "status": "APPROVED",
      "priority": "HIGH",
      "type": "RFT",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [5]",
      "dateRequested": "20170730",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 9,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000147",
      "jobId": "",
      "status": "ASSIGNED",
      "priority": "URGENT",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [6]",
      "dateRequested": "20170803",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 5,
      "jobReqStatus": "ASSIGNED"
    },
    {
      "jobRequestId": "REQ-0000000148",
      "jobId": "",
      "status": "APPROVED",
      "priority": "MEDIUM",
      "type": "PREV",
      "location": {
        "facilityCode": "0231103"
      },
      "title": "Test JobReq0231103 [7]",
      "dateRequested": "2017-09-07",
      "equipment": "Test",
      "fromSection": "ME",
      "toSection": "PVM1",
      "requestor": 6,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000149",
      "jobId": "",
      "status": "ASSIGNED",
      "priority": "MEDIUM",
      "type": "CORR",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [0]",
      "dateRequested": "20170926",
      "equipment": "Test",
      "fromSection": "",
      "toSection": "ESM",
      "requestor": "305",
      "jobReqStatus": "ASSIGNED"
    },
    {
      "jobRequestId": "REQ-0000000150",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [1]",
      "dateRequested": "20170822",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "PVM1",
      "requestor": 7,
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "REQ-0000000151",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "LOW",
      "type": "PREV",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [2]",
      "dateRequested": "20170812",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 9,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000152",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "MEDIUM",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [3]",
      "dateRequested": "20171004",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 4,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000153",
      "jobId": "",
      "status": "NEW",
      "priority": "LOW",
      "type": "RFT",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [4]",
      "dateRequested": "20170930",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 6,
      "jobReqStatus": "NEW"
    },
    {
      "jobRequestId": "REQ-0000000154",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "LOW",
      "type": "PREV",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [5]",
      "dateRequested": "20171007",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 5,
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "REQ-0000000155",
      "jobId": "",
      "status": "ASSIGNED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [6]",
      "dateRequested": "20170720",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 8,
      "jobReqStatus": "ASSIGNED"
    },
    {
      "jobRequestId": "REQ-0000000156",
      "jobId": "",
      "status": "ASSIGNED",
      "priority": "URGENT",
      "type": "RFT",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [7]",
      "dateRequested": "20170726",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 4,
      "jobReqStatus": "ASSIGNED"
    },
    {
      "jobRequestId": "REQ-0000000157",
      "jobId": "",
      "status": "FORWARDED_TO_SHORE",
      "priority": "LOW",
      "type": "COURGENT",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Test JobReq0231104 [8]",
      "dateRequested": "20170812",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC1",
      "requestor": 2,
      "jobReqStatus": "FORWARDED_TO_SHORE"
    },
    {
      "jobRequestId": "02-REQ-000000030",
      "jobId": "",
      "status": "NEW",
      "priority": "MEDIUM",
      "type": "CORR",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "Test JobReq0223301 [2]",
      "dateRequested": "20170731",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 7,
      "jobReqStatus": "NEW"
    },
    {
      "jobRequestId": "02-REQ-000000031",
      "jobId": "",
      "status": "ASSIGNED",
      "priority": "MEDIUM",
      "type": "CORR",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "Test JobReq0223301 [2]",
      "dateRequested": "20170731",
      "equipment": "Test",
      "fromSection": "Mechanical Eng Hull",
      "toSection": "SEC2",
      "requestor": 7,
      "jobReqStatus": "ASSIGNED"
    },
    {
      "jobRequestId": "02-REQ-000000043",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "testsed",
      "equipment": "Test",
      "dateRequested": "20170823",
      "fromSection": "",
      "toSection": "",
      "requestor": "305",
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "02-REQ-000000044",
      "jobId": "",
      "status": "CANCELLED",
      "priority": "HIGH",
      "type": "CORR",
      "location": {
        "facilityCode": "0231104"
      },
      "title": "Power Gen Faulty",
      "equipment": "Test",
      "dateRequested": "20170905",
      "fromSection": "ME2",
      "toSection": "PVCM",
      "requestor": "305",
      "jobReqStatus": "CANCELLED"
    },
    {
      "jobRequestId": "02-REQ-000000045",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "dasdasdasd",
      "equipment": "Test",
      "dateRequested": "20170905",
      "fromSection": "ME",
      "toSection": "ME3",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000046",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "test fairuz",
      "equipment": "Test",
      "dateRequested": "20170905",
      "fromSection": "ME2",
      "toSection": "WE2",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000047",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "fairuz test #91",
      "equipment": "Test",
      "dateRequested": "20170905",
      "fromSection": "ME",
      "toSection": "WE",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000048",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Power Gen 1 Failure",
      "equipment": "Test",
      "dateRequested": "20170914",
      "fromSection": "ME2",
      "toSection": "PVCM",
      "requestor": "305",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000049",
      "jobId": "",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0223302"
      },
      "title": "test fairuz",
      "equipment": "Test",
      "dateRequested": "20170926",
      "fromSection": "ME2",
      "toSection": "PVM1",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000050",
      "jobId": "",
      "status": "NEW",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0223301"
      },
      "title": "dasdasdasd",
      "equipment": "Test",
      "dateRequested": "20171009",
      "fromSection": "",
      "toSection": "",
      "requestor": "",
      "jobReqStatus": "NEW"
    },
    {
      "jobRequestId": "02-REQ-000000053",
      "jobId": "",
      "status": "APPROVED",
      "priority": "HIGH",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "TEST Guan",
      "equipment": "Test",
      "dateRequested": "2018-03-21",
      "fromSection": "ME2",
      "toSection": "PVCM",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000055",
      "jobId": "",
      "status": "NEW",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "02"
      },
      "title": "test create",
      "equipment": "Test",
      "dateRequested": "2018-03-22",
      "fromSection": "",
      "toSection": "",
      "requestor": "",
      "jobReqStatus": "NEW"
    },
    {
      "jobRequestId": "02-REQ-000000056",
      "jobId": "02-COR-000000255",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "REPAIR GEN 1",
      "equipment": "Test",
      "dateRequested": "2018-03-28",
      "fromSection": "ME3",
      "toSection": "PVCM",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    },
    {
      "jobRequestId": "02-REQ-000000057",
      "jobId": "02-COR-000000254",
      "status": "APPROVED",
      "priority": "LOW",
      "type": "CORR",
      "location": {
        "facilityCode": "0231101"
      },
      "title": "Test job request forward",
      "equipment": "Test",
      "dateRequested": "2018-03-28",
      "fromSection": "SMN",
      "toSection": "ME3",
      "requestor": "",
      "jobReqStatus": "APPROVED"
    }
  ];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router) {
    const requests: JobRequestData[] = [];
    this.dataSource = new MatTableDataSource(requests);
  }

  ngOnInit() {
    this.jobRequests = this.getData();
    this.dataSource.data = this.jobRequests;
    this.filterCriteria.data = this.jobRequests;    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  getData() {
    var data = [];
    for (var jrIdx = 0; jrIdx < this.JOB_REQUESTS.length; jrIdx++) {
      var jrItem = this.JOB_REQUESTS[jrIdx];
      var newJobRequestItem = {
        jobRequestNo: jrItem.jobRequestId,
        facility: jrItem.location.facilityCode,
        title: jrItem.title,
        equipment: jrItem.equipment,
        type: jrItem.type,
        dateRequested: jrItem.dateRequested,
        fromSection: jrItem.fromSection,
        toSection: jrItem.toSection,
        status: jrItem.jobReqStatus
      };
      data.push(newJobRequestItem);
    }
    /*
    let data2=[
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
      {facility:2030,equipment:'STBD PROPULSION DIESEL ENGINE',jobRequestNo:'REQ-0000000119',title:'Test JobReq0223301 [1]',
      type:'Corrective',dateRequested:'24-08-2017',fromSection:'Mechanical Eng Hull',toSection:'PVM1',status:'APPROVED'},
    ];
    */
    return data;
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


  onCreate() {
    var url = "/job_request/create";
    this.router.navigate([url]);
  }
}

export interface JobRequestData {
  jobRequestNo: string;
  facility: string;
  type: string;
  title: string;
  equipment: string;
  dateRequested: string;
  fromSection: string;
  toSection: string;
  status: string;
}