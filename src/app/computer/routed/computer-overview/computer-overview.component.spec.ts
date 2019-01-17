import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerOverviewComponent } from './computer-overview.component';

describe('ComputerOverviewComponent', () => {
  let component: ComputerOverviewComponent;
  let fixture: ComponentFixture<ComputerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
