import {
    Component,
    ElementRef,
    inject,
    signal,
    viewChild,
} from '@angular/core';
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

    public searchInput = viewChild.required<ElementRef>('search');

    public async onSearch(): Promise<void> {
        const query = this.searchInput()?.nativeElement.value;
        console.log('search query', query);
        const results = await this.lessonsService.loadLessons({ query });
        this.lessons.set(results);
    }
}
