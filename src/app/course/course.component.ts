import { Component, OnInit, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrl: './course.component.scss',
    standalone: true,
    imports: [],
})
export class CourseComponent implements OnInit {
    public course = signal<Course | null>(null);
    public lessons = signal<Lesson[]>([]);

    public ngOnInit(): void {}
}
