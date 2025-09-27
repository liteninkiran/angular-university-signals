import { Component, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';

@Component({
    selector: 'lesson-detail',
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
    public lesson = input.required<Lesson | null>();
    public lessonUpdated = output<Lesson>();
    public cancel = output();

    public onCancel(): void {
        this.cancel.emit();
    }
}
