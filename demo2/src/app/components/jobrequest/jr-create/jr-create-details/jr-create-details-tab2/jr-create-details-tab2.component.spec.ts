import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrCreateDetailsTab2Component } from './jr-create-details-tab2.component';

describe('JrCreateDetailsTab2Component', () => {
  let component: JrCreateDetailsTab2Component;
  let fixture: ComponentFixture<JrCreateDetailsTab2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrCreateDetailsTab2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrCreateDetailsTab2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
