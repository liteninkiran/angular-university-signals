import { Component, computed, signal } from '@angular/core';
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
    public tenTimesCounter = computed(() => this.counter() * 10);
    public hundredTimesCounter = computed(() => this.tenTimesCounter() * 10);

    public increment(): void {
        this.counter.update((val) => val + 1);
    }
}
