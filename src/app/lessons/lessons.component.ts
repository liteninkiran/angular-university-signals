import { Component, inject, signal } from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';

type Mode = 'master' | 'detail';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss',
})
export class LessonsComponent {
    public mode = signal<Mode>('master');
    public lessons = signal<Lesson[]>([]);
    public selectedLesson = signal<Lesson | null>(null);

    public lessonsService = inject(LessonsService);

    public async onSearch(): Promise<void> {}
}
