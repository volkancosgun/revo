import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbAccountDataServerComponent } from './fb-account-data-server.component';

describe('FbAccountDataServerComponent', () => {
  let component: FbAccountDataServerComponent;
  let fixture: ComponentFixture<FbAccountDataServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbAccountDataServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbAccountDataServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
