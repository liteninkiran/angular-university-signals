import { Component, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lesson } from '../models/lesson.model';

@Component({
    selector: 'resource-demo',
    templateUrl: './resource-demo.component.html',
    styleUrls: ['./resource-demo.component.scss'],
})
export class ResourceDemoComponent {
    private env = environment;

    public search = signal<string>('');
    public lessons = signal<Lesson[]>([]);

    constructor() {}

    public searchLessons(search: string): void {
        this.search.set(search);
    }

    public reset(): void {}

    public reload(): void {}
}
