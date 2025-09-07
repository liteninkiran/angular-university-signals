import { Component, inject, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab],
})
export class HomeComponent {
    public courses = signal<Course[]>([]);
    public coursesService = inject(CoursesService);

    constructor() {
        this.loadCourses().then(() =>
            console.log('All courses loaded', this.courses()),
        );
    }

    public async loadCourses(): Promise<void> {
        try {
            const courses = await this.coursesService.loadAllCourses();
            this.courses.set(courses);
        } catch (err) {
            alert('Error loading courses');
            console.log(err);
        }
    }
}
