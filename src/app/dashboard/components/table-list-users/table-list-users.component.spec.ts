import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListUsersComponent } from './table-list-users.component';

describe('TableListUsersComponent', () => {
  let component: TableListUsersComponent;
  let fixture: ComponentFixture<TableListUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
