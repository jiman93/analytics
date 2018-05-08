import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrCreateDetailsComponent } from './jr-create-details.component';

describe('JrCreateDetailsComponent', () => {
  let component: JrCreateDetailsComponent;
  let fixture: ComponentFixture<JrCreateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrCreateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrCreateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
