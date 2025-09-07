import { Component, inject, OnInit, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Course } from '../models/course.model';
import { CoursesServiceWithFetch } from '../services/courses-fetch.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab],
})
export class HomeComponent implements OnInit {
    public courses = signal<Course[]>([]);
    public coursesService = inject(CoursesServiceWithFetch);

    constructor() {
        this.loadCourses().then(() =>
            console.log('All courses loaded', this.courses()),
        );
    }

    public ngOnInit(): void {}

    public async loadCourses(): Promise<void> {
        // this.coursesService
        //     .loadAllCourses()
        //     .then((courses) => this.courses.set(courses))
        //     .catch((error) => console.log(error));

        try {
            const courses = await this.coursesService.loadAllCourses();
            this.courses.set(courses);
        } catch (err) {
            alert('Error loading courses');
            console.log(err);
        }
    }
}
