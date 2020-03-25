import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSitesTableComponent } from './admin-sites-table.component';

describe('AdminSitesTableComponent', () => {
  let component: AdminSitesTableComponent;
  let fixture: ComponentFixture<AdminSitesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSitesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSitesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
