import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StoryModel } from "./story.model";
import { Observable } from "rxjs";

@Injectable()
export class StoryService {
  constructor(
    private httpClient: HttpClient,
    @Inject("BASE_URL") private baseUrl: string
  ) {}

  getStories(searchTerm: string): Observable<StoryModel[]> {
    return this.httpClient.get<StoryModel[]>(
      `${this.baseUrl}story?searchTerm=${searchTerm}`
    );
  }
}
