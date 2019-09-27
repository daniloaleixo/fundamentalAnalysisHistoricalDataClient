import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricAnalysisComponent } from './historic-analysis.component';

describe('HistoricAnalysisComponent', () => {
  let component: HistoricAnalysisComponent;
  let fixture: ComponentFixture<HistoricAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
