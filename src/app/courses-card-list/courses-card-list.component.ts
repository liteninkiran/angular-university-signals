import { Component, inject, input, output } from '@angular/core';
import { Course } from '../models/course.model';
import { openEditCourseDialog } from '../edit-course-dialog/edit-course-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditCourseDialogData } from '../edit-course-dialog/edit-course-dialog.data.model';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrl: './courses-card-list.component.scss',
    standalone: true,
    imports: [RouterLink],
})
export class CoursesCardListComponent {
    public courses = input.required<Course[]>();
    public courseUpdated = output<Course>();
    public courseDeleted = output<string>();
    public dialog = inject(MatDialog);

    public async onEditCourse(course: Course): Promise<void> {
        (document.activeElement as HTMLElement)?.blur();
        const data: EditCourseDialogData = {
            mode: 'update',
            title: 'Edit Course',
            course,
        };
        const newCourse = await openEditCourseDialog(this.dialog, data);
        if (!newCourse) {
            return;
        }
        this.courseUpdated.emit(newCourse);
    }

    public onDeleteCourse(course: Course): void {
        this.courseDeleted.emit(course.id);
    }
}
