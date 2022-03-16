import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartstateComponent } from './heartstate.component';

describe('HeartstateComponent', () => {
  let component: HeartstateComponent;
  let fixture: ComponentFixture<HeartstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeartstateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
