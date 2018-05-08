import { Component, Inject, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class InfoDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log ("InfoDialogComponent()", data);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}

