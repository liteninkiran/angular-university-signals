import { Component } from '@angular/core';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseCategoryComboboxComponent } from '../course-category-combobox/course-category-combobox.component';

@Component({
    selector: 'edit-course-dialog',
    standalone: true,
    imports: [LoadingIndicatorComponent, ReactiveFormsModule],
    templateUrl: './edit-course-dialog.component.html',
    styleUrl: './edit-course-dialog.component.scss',
})
export class EditCourseDialogComponent {}
