import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTheTechComponent } from './about-the-tech.component';

describe('AboutTheTechComponent', () => {
  let component: AboutTheTechComponent;
  let fixture: ComponentFixture<AboutTheTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutTheTechComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTheTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
