import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListAdminsComponent } from './table-list-admins.component';

describe('TableListAdminsComponent', () => {
  let component: TableListAdminsComponent;
  let fixture: ComponentFixture<TableListAdminsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListAdminsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
