import {
    Component,
    ElementRef,
    inject,
    signal,
    viewChild,
} from '@angular/core';
import { Lesson } from '../models/lesson.model';
import { LessonsService } from '../services/lessons.service';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';

type Mode = 'master' | 'detail';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss',
    imports: [LessonDetailComponent],
})
export class LessonsComponent {
    public mode = signal<Mode>('master');
    public lessons = signal<Lesson[]>([]);
    public selectedLesson = signal<Lesson | null>(null);

    public lessonsService = inject(LessonsService);

    public searchInput = viewChild.required<ElementRef>('search');

    public async onSearch(): Promise<void> {
        const query = this.searchInput()?.nativeElement.value;
        const results = await this.lessonsService.loadLessons({ query });
        this.lessons.set(results);
    }

    public onLessonSelected(lesson: Lesson): void {
        this.mode.set('detail');
        this.selectedLesson.set(lesson);
    }

    public onCancel(): void {
        this.mode.set('master');
    }
}
