import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ExperiencesComponentComponent } from "./experiences-component.component";

describe("ExperiencesComponentComponent", () => {
  let component: ExperiencesComponentComponent;
  let fixture: ComponentFixture<ExperiencesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperiencesComponentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperiencesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
