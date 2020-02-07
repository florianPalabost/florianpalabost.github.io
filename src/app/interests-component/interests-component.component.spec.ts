import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestsComponentComponent } from './interests-component.component';

describe('InterestsComponentComponent', () => {
  let component: InterestsComponentComponent;
  let fixture: ComponentFixture<InterestsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterestsComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
