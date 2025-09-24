import { Component, inject } from '@angular/core';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { EditCourseDialogData } from './edit-course-dialog.data.model';
import { firstValueFrom } from 'rxjs';
import { Course } from '../models/course.model';
import { CoursesService } from '../services/courses.service';

@Component({
    selector: 'edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrl: './edit-course-dialog.component.scss',
    standalone: true,
    imports: [LoadingIndicatorComponent, ReactiveFormsModule],
})
export class EditCourseDialogComponent {
    public dialogRef = inject(MatDialogRef);
    public data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
    public fb = inject(FormBuilder);
    public form = this.fb.group({
        title: [''],
        longDescription: [''],
        category: [''],
        iconUrl: [''],
    });
    public coursesService = inject(CoursesService);

    constructor() {
        this.form.patchValue({
            title: this.data?.course?.title,
            longDescription: this.data?.course?.longDescription,
            category: this.data?.course?.category,
            iconUrl: this.data?.course?.iconUrl,
        });
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public onSave(): void {
        const courseProps = this.form.value as Partial<Course>;
        if (this.data?.mode === 'update') {
            this.saveCourse(this.data?.course!.id, courseProps);
        }
    }

    private async saveCourse(courseId: string, changes: Partial<Course>) {
        try {
            const updatedCourse = await this.coursesService.saveCourse(
                courseId,
                changes,
            );
            this.dialogRef.close(updatedCourse);
        } catch (err) {
            console.error(err);
            alert('Failed to save course');
        }
    }
}

export const openEditCourseDialog = async (
    dialog: MatDialog,
    data: EditCourseDialogData,
) => {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '400px';
    config.data = data;

    const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
    return firstValueFrom(close$);
};
