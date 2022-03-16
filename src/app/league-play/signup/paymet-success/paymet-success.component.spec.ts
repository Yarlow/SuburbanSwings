import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetSuccessComponent } from './paymet-success.component';

describe('PaymetSuccessComponent', () => {
  let component: PaymetSuccessComponent;
  let fixture: ComponentFixture<PaymetSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymetSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
