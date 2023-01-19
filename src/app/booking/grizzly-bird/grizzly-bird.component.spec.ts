import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrizzlyBirdComponent } from './grizzly-bird.component';

describe('GrizzlyBirdComponent', () => {
  let component: GrizzlyBirdComponent;
  let fixture: ComponentFixture<GrizzlyBirdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrizzlyBirdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrizzlyBirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
