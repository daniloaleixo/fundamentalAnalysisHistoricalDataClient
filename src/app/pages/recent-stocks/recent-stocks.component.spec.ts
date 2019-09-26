import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStocksComponent } from './recent-stocks.component';

describe('RecentStocksComponent', () => {
  let component: RecentStocksComponent;
  let fixture: ComponentFixture<RecentStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
