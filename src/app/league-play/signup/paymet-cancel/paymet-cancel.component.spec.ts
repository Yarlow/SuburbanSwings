import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetCancelComponent } from './paymet-cancel.component';

describe('PaymetCancelComponent', () => {
  let component: PaymetCancelComponent;
  let fixture: ComponentFixture<PaymetCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymetCancelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymetCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
