import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { fromEvent, of, throwError } from "rxjs";
import { StoryModel } from "./story.model";
import { StoryService } from "./story.service";
import { StoryComponent } from "./story.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";

describe("StoryComponent", () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;
  let storyService: StoryService;

  const mockStoryService = {
    getStories: () =>
      of([
        { title: "Mock Story 1" } as StoryModel,
        { title: "Mock Story 2" } as StoryModel,
      ]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoryComponent],
      providers: [{ provide: StoryService, useValue: mockStoryService }],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    storyService = TestBed.inject(StoryService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should log an error if the API call fails", () => {
    spyOn(console, "error");
    spyOn(storyService, "getStories").and.returnValue(
      throwError({ status: 404 })
    );
    component.getStories('');
    expect(console.error).toHaveBeenCalled();
  });

  it("should open story in new tab when provided with url", () => {
    const spyWindow = spyOn(window, "open");
    component.openStoryInNewTab("https://test.com");
    expect(spyWindow).toHaveBeenCalledWith("https://test.com", "_blank");
  });

  it("should not open story in new tab when not provided with url", () => {
    const spyWindow = spyOn(window, "open");
    component.openStoryInNewTab("");
    expect(spyWindow).not.toHaveBeenCalledWith("https://test.com", "_blank");
  });

  it("should call getStories when searchControl value changes", fakeAsync(() => {
    const spyStories = spyOn(component, "getStories");
    const searchTerm = "test search term";
    component.searchControl.setValue(searchTerm);
    fixture.detectChanges();
    tick(900);
    expect(spyStories).not.toHaveBeenCalledWith(searchTerm);
    tick(1001);
    expect(spyStories).toHaveBeenCalledWith(searchTerm);
  }));
});
