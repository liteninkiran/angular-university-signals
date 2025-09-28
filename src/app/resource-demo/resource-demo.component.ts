import {
    Component,
    effect,
    resource,
    ResourceLoaderParams,
    signal,
} from '@angular/core';
import { environment } from '../../environments/environment';
import { Lesson } from '../models/lesson.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

type Search = {
    search: string;
};

@Component({
    selector: 'resource-demo',
    templateUrl: './resource-demo.component.html',
    styleUrls: ['./resource-demo.component.scss'],
    standalone: true,
    imports: [MatProgressSpinner],
})
export class ResourceDemoComponent {
    private env = environment;

    public search = signal<string>('');
    public lessons = resource<Lesson[], Search>({
        params: () => ({
            search: this.search(),
        }),
        loader: async (loaderParams: ResourceLoaderParams<Search>) => {
            const { abortSignal, params } = loaderParams;
            const url = `${this.env.apiRoot}/search-lessons?query=${params?.search}&courseId=18`;
            const options = { signal: abortSignal };
            const response = await fetch(url, options);
            const json = await response.json();
            return json.lessons;
        },
    });

    constructor() {
        effect(() => {
            console.log('Searching Lessons', this.search());
        });
    }

    public searchLessons(search: string): void {
        this.search.set(search);
    }

    public reset(): void {}

    public reload(): void {}
}
