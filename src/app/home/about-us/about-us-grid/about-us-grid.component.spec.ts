import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsGridComponent } from './about-us-grid.component';

describe('AboutUsGridComponent', () => {
  let component: AboutUsGridComponent;
  let fixture: ComponentFixture<AboutUsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutUsGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
