import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbTableMenuComponent } from './fb-table-menu.component';

describe('FbTableMenuComponent', () => {
  let component: FbTableMenuComponent;
  let fixture: ComponentFixture<FbTableMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbTableMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbTableMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
