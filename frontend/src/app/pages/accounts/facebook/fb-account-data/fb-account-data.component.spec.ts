import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAccountDataComponent } from './fb-account-data.component';

describe('FbAccountDataComponent', () => {
  let component: FbAccountDataComponent;
  let fixture: ComponentFixture<FbAccountDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbAccountDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAccountDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
