import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {Course} from "../model/course";
import {CoursesService} from "../services/courses.service";
import {debounceTime, distinctUntilChanged, startWith, tap, delay, catchError, finalize} from 'rxjs/operators';
import {merge, fromEvent, throwError} from "rxjs";
import { Lesson } from '../model/lesson';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

    course:Course;

    loading = false

    lessons: Lesson[]

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatSort)
    sort: MatSort;

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService) {
    }
    
    displayedColumns = ["seqNo", "description", "duration"];

    ngOnInit() {

        this.course = this.route.snapshot.data["course"];

        this.loadLessonsPage();

    }

    loadLessonsPage(){
      this.loading = true;

      this.coursesService.findLessons(this.course.id, 
        this.sort?.direction ?? "asc", 
        this.paginator?.pageIndex ?? 0, 
        this.paginator?.pageSize ?? 3
      ).pipe(
        tap(lessons=>this.lessons=lessons),
        catchError(err=> {
          console.log("Error loading sessions",err);
          alert("Error loading sessions.");

          return throwError(err)
        }),
        finalize(()=>this.loading=false)
      )
      .subscribe();
    }

    ngAfterViewInit() {

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(()=>this.loadLessonsPage())
      )
      .subscribe()
    }

}
