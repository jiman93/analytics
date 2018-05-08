import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrListComponent } from './jr-list.component';

describe('JrListComponent', () => {
  let component: JrListComponent;
  let fixture: ComponentFixture<JrListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
