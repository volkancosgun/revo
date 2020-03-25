import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbBotComponent } from './fb-bot.component';

describe('FbBotComponent', () => {
  let component: FbBotComponent;
  let fixture: ComponentFixture<FbBotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbBotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbBotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
