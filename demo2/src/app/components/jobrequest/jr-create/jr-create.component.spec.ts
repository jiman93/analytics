import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JrCreateComponent } from './jr-create.component';

describe('JrCreateComponent', () => {
  let component: JrCreateComponent;
  let fixture: ComponentFixture<JrCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JrCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
