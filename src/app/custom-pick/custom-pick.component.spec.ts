import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPickComponent } from './custom-pick.component';

describe('CustomPickComponent', () => {
  let component: CustomPickComponent;
  let fixture: ComponentFixture<CustomPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
