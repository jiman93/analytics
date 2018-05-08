import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppUtil } from './../../common/AppUtil';
import { NotificationService } from './../../common/NotificationService';
import { ShipService } from './../../services/ship.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ship-readiness',
  templateUrl: './ship-readiness.component.html',
  styleUrls: ['./ship-readiness.component.less'],
  providers: [ShipService, NotificationService]
})
export class ShipReadinessComponent {
  title = 'Ship Readiness';
  mobileQuery: MediaQueryList;
  shipForm: FormGroup;
  seriesData : any[];


  private _mobileQueryListener: () => void;

  constructor(
    private notificationService: NotificationService,
    private shipService: ShipService,
    private _fb: FormBuilder,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.initForm();
    this.onRefresh(); // auto start
  }

  initForm() {
    this.shipForm = this._fb.group({
      fromDate: ['', [Validators.required]],
      totalWeeks: ['', [Validators.required]],
      cat1: ['', [Validators.required]],
      cat2: ['', [Validators.required]],
      cat3: ['', [Validators.required]],
      cat4: ['', [Validators.required]],
      cat5: ['', [Validators.required]],
      refit: ['', [Validators.required]],
      urdef: ['', [Validators.required]],
      gurdef: ['', [Validators.required]],
      other: ['', [Validators.required]]
    });


    // patch the values
    this.shipForm.controls.fromDate.patchValue("2017-05-01");
    this.shipForm.controls.totalWeeks.patchValue(52);
    this.shipForm.controls.cat1.patchValue("ON");
    this.shipForm.controls.cat2.patchValue("ON");
    this.shipForm.controls.cat3.patchValue("ON");
    this.shipForm.controls.cat4.patchValue("ON");
    this.shipForm.controls.cat5.patchValue("ON");
    this.shipForm.controls.fromDate.patchValue("refit");
    this.shipForm.controls.fromDate.patchValue("urdef");
    this.shipForm.controls.fromDate.patchValue("gurdef");
    this.shipForm.controls.fromDate.patchValue("other");
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  selectMenu(menuName: string) {
    console.log("menu selected", menuName)
  }

  onRefresh() {
    var vm = this;
    var formData = this.shipForm.getRawValue();
    formData.fromDate = AppUtil.formatDate(formData.fromDate, null, "YYYY-MM-DD");
    this.shipService.getShipJobs("ALL", formData.fromDate, formData.totalWeeks, function (jobs) {
      console.log("SUCCESS", jobs);
      vm.notificationService.addEvent({
        eventId: "ship.details",
        value: null,
        values: jobs
      });
      vm.refreshChart();
    }, function (err) {
      console.log("ERROR");
    });
  }

  refreshChart() {
    var formData = this.shipForm.getRawValue();
    this.seriesData = this.shipService.getShipSeriesByCategory(formData);
    this.notificationService.addEvent({
      eventId: "ship.chart.category",
      value: null,
      values: this.seriesData
    });
    var seriesData2 = this.shipService.getShipSeriesByJobType(formData);
    this.notificationService.addEvent({
      eventId: "ship.chart.jobtype",
      value: null,
      values: seriesData2
    });
    var seriesData3 = this.shipService.getShipOverallReadinessSeries(formData);
    this.notificationService.addEvent({
      eventId: "ship.chart.overallReadiness",
      value: null,
      values: seriesData3
    });

  }
}

