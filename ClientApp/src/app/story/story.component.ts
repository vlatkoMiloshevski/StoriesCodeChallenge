import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { StoryModel } from "./story.model";
import { StoryService } from "./story.service";

@Component({
  selector: "app-home",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"],
})
export class StoryComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ["title"];
  searchControl: FormControl;
  public dataSource: MatTableDataSource<StoryModel> =
    new MatTableDataSource<any>([]);
  @ViewChild("paginator", { static: false }) paginator: MatPaginator;

  constructor(private storyService: StoryService) {
    this.searchControl = new FormControl();
  }

  ngOnInit(): void {
    this.getStories('');
    this.searchRegistryEvent();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getStories(searchTerm: string) {
    this.storyService.getStories(searchTerm).subscribe(
      (result) => {
        this.dataSource.data = result;
      },
      (error) => console.error(error)
    );
  }

  searchRegistryEvent() {
    this.searchControl.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        this.getStories(searchTerm);
      });
  }

  openStoryInNewTab(url: string) {
    if (url) {
      window.open(url, "_blank");
    }
  }
}
