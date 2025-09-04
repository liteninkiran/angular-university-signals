import { Component, signal } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';

type Counter = {
    value: number;
};

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [MatTabGroup, MatTab],
})
export class HomeComponent {
    public counter = signal<Counter>({
        value: 100,
    });

    public increment(): void {
        this.counter.update((counter) => ({
            ...counter,
            value: counter.value + 1,
        }));
    }
}
