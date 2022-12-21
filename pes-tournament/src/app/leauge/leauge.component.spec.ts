import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaugeComponent } from './leauge.component';

describe('LeaugeComponent', () => {
  let component: LeaugeComponent;
  let fixture: ComponentFixture<LeaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
