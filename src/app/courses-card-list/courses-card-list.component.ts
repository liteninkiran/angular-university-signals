import { Component, input } from '@angular/core';
import { Course } from '../models/course.model';

@Component({
    selector: 'courses-card-list',
    imports: [],
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss',
})
export class CoursesCardListComponent {
    public courses = input.required<Course[]>();
}
