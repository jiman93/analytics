import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrCreateAtachmentsComponent } from './jr-create-atachments.component';

describe('JrCreateAtachmentsComponent', () => {
  let component: JrCreateAtachmentsComponent;
  let fixture: ComponentFixture<JrCreateAtachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrCreateAtachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrCreateAtachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
