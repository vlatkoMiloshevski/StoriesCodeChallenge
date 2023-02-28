import { NgModule } from "@angular/core";
import { StoryComponent } from "./story.component";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { StoryService } from "./story.service";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: StoryComponent,
    canActivate: [],
  },
];

@NgModule({
  declarations: [StoryComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    RouterModule.forChild(routes),
  ],
  providers: [StoryService],
  exports: [],
})
export class StoryModule {}
