import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkytrakDescriptionComponent } from './skytrak-description.component';

describe('SkytrakDescriptionComponent', () => {
  let component: SkytrakDescriptionComponent;
  let fixture: ComponentFixture<SkytrakDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkytrakDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkytrakDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
