import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActiveComponent } from './table-active.component';

describe('TableActiveComponent', () => {
  let component: TableActiveComponent;
  let fixture: ComponentFixture<TableActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
