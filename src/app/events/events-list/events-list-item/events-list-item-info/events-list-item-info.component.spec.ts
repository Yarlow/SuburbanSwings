import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListItemInfoComponent } from './events-list-item-info.component';

describe('EventsListItemInfoComponent', () => {
  let component: EventsListItemInfoComponent;
  let fixture: ComponentFixture<EventsListItemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsListItemInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsListItemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
