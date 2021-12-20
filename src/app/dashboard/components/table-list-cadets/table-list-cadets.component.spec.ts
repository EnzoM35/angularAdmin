import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableListCadetsComponent } from './table-list-cadets.component';

describe('TableListCadetsComponent', () => {
  let component: TableListCadetsComponent;
  let fixture: ComponentFixture<TableListCadetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableListCadetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableListCadetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
