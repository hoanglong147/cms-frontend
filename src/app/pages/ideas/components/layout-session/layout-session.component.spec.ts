import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSessionComponent } from './layout-session.component';

describe('LayoutSessionComponent', () => {
  let component: LayoutSessionComponent;
  let fixture: ComponentFixture<LayoutSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
