import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AppUtil } from './../../common/AppUtil';
import { NotificationService } from './../../common/NotificationService';
import { MaintenanceService } from './../../services/maintenance.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-status',
  templateUrl: './maintenance-status.component.html',
  styleUrls: ['./maintenance-status.component.less'],
  providers: [MaintenanceService, NotificationService]
})
export class MaintenanceStatusComponent {
  title = 'Overall Maintenance Status';
  mobileQuery: MediaQueryList;
  shipForm: FormGroup;
  seriesData: any[];

  private _mobileQueryListener: () => void;

  constructor(
    private notificationService: NotificationService,
    private maintenanceService: MaintenanceService,
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
  }

  initForm() {
    this.shipForm = this._fb.group({
      fromDate: ['', [Validators.required]],
      totalWeeks: ['', [Validators.required]],
      olm: ['', [Validators.required]],
      dlm: ['', [Validators.required]],
      ilm: ['', [Validators.required]],
      otherMaintenanceLevel: ['', [Validators.required]]
    });


    // patch the values
    this.shipForm.controls.fromDate.patchValue("2017-05-01");
    this.shipForm.controls.totalWeeks.patchValue(52);
    this.shipForm.controls.olm.patchValue("ON");
    this.shipForm.controls.dlm.patchValue("ON");
    this.shipForm.controls.ilm.patchValue("ON");
    this.shipForm.controls.otherMaintenanceLevel.patchValue("ON");
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
    this.maintenanceService.getMaintenanceJobs("ALL", formData.fromDate, formData.totalWeeks, function (jobs) {
      console.log("SUCCESS", jobs);
      vm.notificationService.addEvent({
        eventId: "maintenance.details",
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
    this.seriesData = this.maintenanceService.getMaintenanceCostsSeriesByMaintenanceLevel(formData);
    this.notificationService.addEvent({
      eventId: "maintenance.chart.category",
      value: null,
      values: this.seriesData
    });
  }
}


