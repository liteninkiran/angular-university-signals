import { Component, input } from '@angular/core';
import { Course } from '../models/course.model';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss',
    standalone: true,
})
export class CoursesCardListComponent {
    public courses = input.required<Course[]>();
}
