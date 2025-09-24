import { Component, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lesson } from '../models/lesson.model';

@Component({
    selector: 'resource-demo',
    templateUrl: './resource-demo.component.html',
    styleUrls: ['./resource-demo.component.scss'],
})
export class ResourceDemoComponent {
    env = environment;

    search = signal<string>('');

    lessons = signal<Lesson[]>([]);

    constructor() {}

    searchLessons(search: string) {
        this.search.set(search);
    }

    reset() {}

    reload() {}
}
