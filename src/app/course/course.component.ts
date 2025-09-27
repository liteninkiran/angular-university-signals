import { Component, inject, OnInit, signal } from '@angular/core';
import { Course } from '../models/course.model';
import { Lesson } from '../models/lesson.model';
import { ActivatedRoute } from '@angular/router';

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
    public route = inject(ActivatedRoute);

    public ngOnInit(): void {
        this.course.set(this.route.snapshot.data['course']);
        this.lessons.set(this.route.snapshot.data['lessons']);
    }
}
