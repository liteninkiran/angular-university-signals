import { Component, effect, EffectRef, signal } from '@angular/core';
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

    public effectRef: EffectRef | null = null;

    constructor() {
        this.effectRef = effect((onCleanup) => {
            const counter = this.counter();
            const timeout = setTimeout(() => {
                console.log(`Counter: ${counter}`);
            }, 1000);
            onCleanup(() => {
                console.log('Cleanup');
                clearTimeout(timeout);
            });
        });
    }

    public increment(): void {
        this.counter.update((val) => val + 1);
    }

    public onCleanup(): void {
        this.effectRef?.destroy();
    }
}
