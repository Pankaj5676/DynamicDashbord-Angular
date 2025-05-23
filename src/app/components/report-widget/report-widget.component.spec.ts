import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportWidgetComponent } from './report-widget.component';

describe('ReportWidgetComponent', () => {
  let component: ReportWidgetComponent;
  let fixture: ComponentFixture<ReportWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
