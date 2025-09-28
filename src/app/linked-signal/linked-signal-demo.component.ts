import { Component, linkedSignal, signal } from '@angular/core';

type Course = {
    code: string;
    title: string;
    defaultQuantity: number;
};

@Component({
    selector: 'linked-signal-demo',
    templateUrl: './linked-signal-demo.component.html',
    styleUrl: './linked-signal-demo.component.scss',
})
export class LinkedSignalDemoComponent {
    public courses: Course[] = [
        {
            code: 'BEGINNERS',
            title: 'Angular for Beginners',
            defaultQuantity: 10,
        },
        {
            code: 'SIGNALS',
            title: 'Angular Signals In Depth',
            defaultQuantity: 20,
        },
        {
            code: 'SSR',
            title: 'Angular SSR In Depth',
            defaultQuantity: 30,
        },
    ];

    public selectedCourse = signal<string | null>('BEGINNERS');

    public quantity = linkedSignal({
        source: () => ({ courseCode: this.selectedCourse }),
        computation: (source, previous) => {
            console.log('Linked signal source', source.courseCode());
            console.log('Linked signal previous', previous);
            const findFn = (c: Course) => c.code === source.courseCode();
            const course = this.courses.find(findFn);
            return course?.defaultQuantity ?? 1;
        },
    });

    constructor() {}

    public onQuantityChanged(quantity: string): void {
        this.quantity.set(parseInt(quantity));
    }

    public onArticleAdded(): void {
        alert(`${this.quantity()} licenses added for ${this.selectedCourse()}`);
    }

    public onCourseSelected(courseCode: string): void {
        this.selectedCourse.set(courseCode);
    }
}
