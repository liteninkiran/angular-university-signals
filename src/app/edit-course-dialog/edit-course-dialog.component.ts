import { Component, inject, signal } from '@angular/core';
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
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';
import { CourseCategory } from '../models/course-category.model';

@Component({
    selector: 'edit-course-dialog',
    templateUrl: './edit-course-dialog.component.html',
    styleUrl: './edit-course-dialog.component.scss',
    standalone: true,
    imports: [
        LoadingIndicatorComponent,
        ReactiveFormsModule,
        CourseCategoryComboboxComponent,
    ],
})
export class EditCourseDialogComponent {
    public dialogRef = inject(MatDialogRef);
    public data: EditCourseDialogData = inject(MAT_DIALOG_DATA);
    public fb = inject(FormBuilder);
    public form = this.fb.group({
        title: [''],
        longDescription: [''],
        iconUrl: [''],
    });
    public coursesService = inject(CoursesService);
    public category = signal<CourseCategory>('BEGINNER');

    constructor() {
        this.form.patchValue({
            title: this.data?.course?.title,
            longDescription: this.data?.course?.longDescription,
            iconUrl: this.data?.course?.iconUrl,
        });
        this.category.set(this.data.course!.category);
    }

    public onClose(): void {
        this.dialogRef.close();
    }

    public async onSave(): Promise<void> {
        const courseProps = this.form.value as Partial<Course>;
        courseProps.category = this.category();
        if (this.data?.mode === 'update') {
            await this.saveCourse(this.data?.course!.id, courseProps);
        } else if (this.data?.mode === 'create') {
            await this.createCourse(courseProps);
        }
    }

    private async saveCourse(
        courseId: string,
        changes: Partial<Course>,
    ): Promise<void> {
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

    private async createCourse(course: Partial<Course>): Promise<void> {
        try {
            const newCourse = await this.coursesService.createCourse(course);
            this.dialogRef.close(newCourse);
        } catch (err) {
            console.error(err);
            alert('Failed to create course');
        }
    }
}

export const openEditCourseDialog = async (
    dialog: MatDialog,
    data: EditCourseDialogData,
): Promise<Course> => {
    const config = new MatDialogConfig();
    config.disableClose = true;
    config.autoFocus = true;
    config.width = '400px';
    config.data = data;

    const close$ = dialog.open(EditCourseDialogComponent, config).afterClosed();
    return firstValueFrom(close$);
};
