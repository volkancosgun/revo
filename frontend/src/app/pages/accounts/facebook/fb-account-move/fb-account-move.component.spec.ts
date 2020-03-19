import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAccountMoveComponent } from './fb-account-move.component';

describe('FbAccountMoveComponent', () => {
  let component: FbAccountMoveComponent;
  let fixture: ComponentFixture<FbAccountMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbAccountMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAccountMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
