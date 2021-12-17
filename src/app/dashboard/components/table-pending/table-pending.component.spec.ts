import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePendingComponent } from './table-pending.component';

describe('TablePendingComponent', () => {
  let component: TablePendingComponent;
  let fixture: ComponentFixture<TablePendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePendingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
