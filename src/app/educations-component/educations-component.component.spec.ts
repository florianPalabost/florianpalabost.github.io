import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EducationsComponentComponent } from "./educations-component.component";

describe("EducationsComponentComponent", () => {
  let component: EducationsComponentComponent;
  let fixture: ComponentFixture<EducationsComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EducationsComponentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
