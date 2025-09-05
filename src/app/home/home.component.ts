import {
    afterNextRender,
    Component,
    effect,
    inject,
    Injector,
    runInInjectionContext,
    signal,
} from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab],
})
export class HomeComponent {
    public counter = signal<number>(0);

    private injector = inject(Injector);

    constructor() {
        afterNextRender(() => {
            runInInjectionContext(this.injector, () => {
                effect(() => {
                    console.log(`Counter: ${this.counter()}`);
                });
            });
        });
    }

    public increment(): void {
        this.counter.update((val) => val + 1);
    }
}
