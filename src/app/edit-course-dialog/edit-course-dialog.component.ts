import { Component, inject } from '@angular/core';
import { LoadingIndicatorComponent } from '../loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
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
    public diaglogRef = inject(MatDialogRef);
    public onClose(): void {
        this.diaglogRef.close();
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
