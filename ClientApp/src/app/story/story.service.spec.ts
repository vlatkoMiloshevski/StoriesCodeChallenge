import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { StoryService } from "./story.service";
import { StoryModel } from "./story.model";

describe("StoryService", () => {
  let service: StoryService;
  let httpMock: HttpTestingController;
  const BASE_URL = "baseUrl";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService, { provide: "BASE_URL", useValue: BASE_URL }],
    });
    service = TestBed.get(StoryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return an Observable of StoryModel[]", () => {
    const searchTerm = "test";
    const expectedStories: StoryModel[] = [
      { title: "Test Story 1", url: "http://test.com/story1" },
      { title: "Test Story 2", url: "http://test.com/story2" },
    ];
    service.getStories(searchTerm).subscribe((stories) => {
      expect(stories).toEqual(expectedStories);
    });
    const req = httpMock.expectOne(`${BASE_URL}story?searchTerm=${searchTerm}`);
    expect(req.request.method).toBe("GET");
    req.flush(expectedStories);
  });
});
