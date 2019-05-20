import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BintouchComponent } from './bintouch.component';

describe('BintouchComponent', () => {
  let component: BintouchComponent;
  let fixture: ComponentFixture<BintouchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BintouchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BintouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
