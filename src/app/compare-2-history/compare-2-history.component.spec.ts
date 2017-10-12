import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Compare2HistoryComponent } from './compare-2-history.component';

describe('Compare2HistoryComponent', () => {
  let component: Compare2HistoryComponent;
  let fixture: ComponentFixture<Compare2HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Compare2HistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Compare2HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
