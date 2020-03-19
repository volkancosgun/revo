import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAccountEditComponent } from './fb-account-edit.component';

describe('FbAccountEditComponent', () => {
  let component: FbAccountEditComponent;
  let fixture: ComponentFixture<FbAccountEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbAccountEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
