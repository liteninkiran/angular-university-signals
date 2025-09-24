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
