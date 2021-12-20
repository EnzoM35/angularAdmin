import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListAllComponent } from './table-list-all.component';

describe('TableListAllComponent', () => {
  let component: TableListAllComponent;
  let fixture: ComponentFixture<TableListAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
