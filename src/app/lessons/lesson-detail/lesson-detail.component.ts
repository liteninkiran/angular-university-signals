import { Component, inject, input, output } from '@angular/core';
import { Lesson } from '../../models/lesson.model';
import { MessagesService } from '../../messages/messages.service';
import { LessonsService } from '../../services/lessons.service';

@Component({
    selector: 'lesson-detail',
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss',
})
export class LessonDetailComponent {
    public lesson = input.required<Lesson | null>();
    public lessonUpdated = output<Lesson>();
    public cancel = output();

    public lessonsService = inject(LessonsService);
    public messagesService = inject(MessagesService);

    public onCancel(): void {
        this.cancel.emit();
    }

    public async onSave(description: string) {
        try {
            const lesson = this.lesson();
            const updatedLesson = await this.lessonsService.saveLesson(
                lesson!.id,
                { description },
            );
            this.lessonUpdated.emit(updatedLesson);
        } catch (err) {
            console.error(err);
            this.messagesService.showMessage(
                'Error saving lesson. Check console.',
                'error',
            );
        }
    }
}
