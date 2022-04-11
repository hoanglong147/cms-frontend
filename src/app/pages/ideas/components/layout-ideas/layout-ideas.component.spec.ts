import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutIdeasComponent } from './layout-ideas.component';

describe('LayoutIdeasComponent', () => {
  let component: LayoutIdeasComponent;
  let fixture: ComponentFixture<LayoutIdeasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutIdeasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
