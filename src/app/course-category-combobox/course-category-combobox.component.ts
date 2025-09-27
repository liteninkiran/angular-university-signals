import { Component, input, model } from '@angular/core';
import { CourseCategory } from '../models/course-category.model';

@Component({
    selector: 'course-category-combobox',
    templateUrl: './course-category-combobox.component.html',
    styleUrl: './course-category-combobox.component.scss',
    standalone: true,
    imports: [],
})
export class CourseCategoryComboboxComponent {
    public label = input.required<string>();
    public value = model.required<CourseCategory>();

    public onCategoryChanged(category: string): void {
        this.value.set(category as CourseCategory);
    }
}
