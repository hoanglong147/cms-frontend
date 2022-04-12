import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterIdeasListComponent } from './filter-ideas-list.component';

describe('FilterIdeasListComponent', () => {
  let component: FilterIdeasListComponent;
  let fixture: ComponentFixture<FilterIdeasListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterIdeasListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterIdeasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
